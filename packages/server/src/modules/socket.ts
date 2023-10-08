import ShortUniqueId from 'short-unique-id';
import { Server, Socket } from 'socket.io';

import { EVENTS, MEMBERS, makeBoard } from '@shared/utils';
import { Move, Rooms, Boards, Message, Update } from '@shared/types';

import logger from './logger.js';
import { userMove, gameEnd } from './game.js';


// #region : Constants & Utils -------------------------------------------------------------------------------

const rooms: Rooms = {};
const boards: Boards = {};

function delay(ms: number = 100) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// #endregion ------------------------------------------------------------------------------------------------


export default function socket({ io }: { io: Server }) {

    const suid = new ShortUniqueId({ length: 10 });

    // On Client connect
    io.on(EVENTS.SERVER._CONNECT, (socket: Socket) => {

        // #region : Debugging -------------------------------------------------------------------------------

        socket.on(EVENTS.CLIENT._DEBUG, (msg) => {
            logger.info(`${socket.id} >> ${msg}`);
        });

        // #endregion ----------------------------------------------------------------------------------------


        // #region : Client Connection -----------------------------------------------------------------------

        // Server logs Client connection
        logger.info(`User connected @ ${socket.id}!`);
        logger.info(`${io.engine.clientsCount} user(s) connected.`);

        // Server validates Client connection
        socket.emit(EVENTS.SERVER._CONNECT);

        // Server sends Rooms to new Client
        socket.emit(EVENTS.SERVER.ROOMS, rooms);

        // On Client disconnect
        socket.on(EVENTS.CLIENT._DISCONNECT, () => {
            logger.info(`${socket.id} has disconnected.`)
            logger.info(`${io.engine.clientsCount} user(s) connected.`);
        });

        // #endregion ----------------------------------------------------------------------------------------


        // #region : Lobby Signals ---------------------------------------------------------------------------

        // Helper: Broadcast updated Rooms to all Clients
        function roomsUpdated() {
            io.emit(EVENTS.SERVER.ROOMS, rooms);
            logger.info(String(Object.keys(rooms).length) + ' room(s).')
        };

        // On Client requests Rooms
        socket.on(EVENTS.CLIENT.ROOMS, () => {
            socket.emit(EVENTS.SERVER.ROOMS, rooms);
        });

        // On Client exits Room
        socket.on(EVENTS.CLIENT.EXIT_ROOM, (id: string) => {

            const room = rooms[id];

            if (!room) {
                socket.emit(EVENTS.SERVER.ROOM_DNE);
                return;
            };

            socket.leave(id);
            socket.emit(EVENTS.SERVER.EXITED_ROOM);

            const host = room.host;
            const guest = room.guest;

            if (socket.id === guest.id) {

                // Notify Host
                socket.to(host.id).emit(EVENTS.SERVER.GUEST_LEFT);

                // Reset Guest info
                room.members -= 1;
                guest.ready = false;
                guest.name = '-';
                guest.id = '';

            } else if (socket.id === host.id) {

                // Delete Room & Board Records
                delete rooms[id];
                delete boards[id];

                // Force-Exit & notify Guest
                socket.to(guest.id).emit(EVENTS.SERVER.EXITED_ROOM);
                socket.to(guest.id).emit(EVENTS.SERVER.HOST_LEFT);

            };

            roomsUpdated();

        });

        // On Client makes Room
        socket.on(EVENTS.CLIENT.MAKE_ROOM, (name: string, pass: string, user: string) => {

            // Room Creation
            const id = suid.rnd();
            boards[id] = makeBoard();

            rooms[id] = {
                id, name, pass, members: 1,
                host: { id: socket.id, name: user, ready: false },
                guest: { id: '', name: '-', ready: false },
            };

            // Update Rooms
            roomsUpdated();

            // Room Join
            socket.join(id);
            socket.emit(EVENTS.SERVER.JOINED_ROOM, id, true);

        });

        // On Client joins Room
        socket.on(EVENTS.CLIENT.JOIN_ROOM, (id: string, pass: string, user: string) => {

            if (!rooms[id]) {
                socket.emit(EVENTS.SERVER.ROOM_DNE);
                return;
            };

            const room = rooms[id];
            if (room.members >= MEMBERS) {
                socket.emit(EVENTS.SERVER.ROOM_FULL);
                return;
            }

            if (pass === '' || pass === room.pass) {

                room.members += 1;
                room.guest.id = socket.id;
                room.guest.name = user;

                socket.join(id);
                socket.emit(EVENTS.SERVER.JOINED_ROOM, id, false);

                roomsUpdated();

            };

        });

        // On Client is Ready
        socket.on(EVENTS.CLIENT.READY, (roomID: string, ready: boolean) => {

            if (rooms && roomID && rooms[roomID]) {

                // Constants
                const room = rooms[roomID];
                const host = room.host;
                const guest = room.guest;

                // Check if User is Ready
                const user = (socket.id === host.id) ? host : guest;
                user.ready = ready;


                // Check if both Users are Ready
                const other = (socket.id === host.id) ? guest : host;
                const game_ready = user.ready && other.ready;

                socket.emit(EVENTS.SERVER.READY, user.ready);

                if (game_ready) {

                    // Update Server & Client Boards
                    boards[roomID] = makeBoard();
                    boardUpdate(roomID);

                    // Update Ready & Turn States
                    io.in(roomID).emit(EVENTS.SERVER.GAME_READY);
                    io.to(host.id).emit(EVENTS.SERVER.TURN);
                    io.to(guest.id).emit(EVENTS.SERVER.END_TURN);

                }

            }
        });

        // #endregion ----------------------------------------------------------------------------------------


        // #region : Chat Signals ----------------------------------------------------------------------------

        // On Client sends Message
        socket.on(EVENTS.CLIENT.MESSAGE, (roomID: string, user: string, text: string) => {

            const userID = socket.id;
            const date = new Date();
            const time = `${date.getHours()}:${date.getMinutes()}`;

            const _msg: Message = { user, userID, time, text };
            io.in(roomID).emit(EVENTS.SERVER.MESSAGE, _msg);

        });

        // #endregion ----------------------------------------------------------------------------------------


        // #region : Game Signals ----------------------------------------------------------------------------


        // Helper: Broadcast updated BOARD to all Clients in Room
        function boardUpdate(roomID: string) {
            io.in(roomID).emit(EVENTS.SERVER.BOARD, boards[roomID]);
        };

        // Helper: Broadcast last MOVE to all Clients in Room
        async function updates(roomID: string, updates: Update[]) {

            for (let i = 0; i < updates.length; i++) {

                const update = updates[i];

                const move = update.move;
                const value = update.value;
                io.in(roomID).emit(EVENTS.SERVER.UPDATE, move, value);

                await delay();

            }

        }

        // On Client Move
        socket.on(EVENTS.CLIENT.MOVE, async (roomID: string, move: Move) => {

            if (rooms && roomID && rooms[roomID]) {

                // Update Board with Move
                const [moves, board, extraTurn] = userMove(boards[roomID], move);
                boards[roomID] = board;

                // Relays each individual Move & effect
                await updates(roomID, moves);

                // Allows Clients to check for Sync-Errors
                boardUpdate(roomID);

                // Check if Game ended
                const winner = gameEnd(board);
                if (winner >= 0) {

                    const room = rooms[roomID];
                    const host = room.host;
                    const guest = room.guest;

                    if (winner >= 2) {
                        io.in(roomID).emit(EVENTS.SERVER.GAME_TIE);
                    } else if (winner === 0) {
                        io.to(host.id).emit(EVENTS.SERVER.GAME_WIN);
                        io.to(guest.id).emit(EVENTS.SERVER.GAME_LOSE);
                    } else if (winner === 1) {
                        io.to(guest.id).emit(EVENTS.SERVER.GAME_WIN);
                        io.to(host.id).emit(EVENTS.SERVER.GAME_LOSE);
                    }

                    io.to(roomID).emit(EVENTS.SERVER.READY, false);

                    host.ready = false;
                    guest.ready = false;
                    boards[roomID] = makeBoard();
                }

                // User has Extra Turn
                else if (extraTurn) socket.emit(EVENTS.SERVER.TURN);

                // User Ends Turn; Opponent Start Turn
                else {
                    socket.broadcast.emit(EVENTS.SERVER.TURN);
                    socket.emit(EVENTS.SERVER.END_TURN);
                }

            } else socket.emit(EVENTS.SERVER.ROOM_DNE);

        });

        // #endregion ----------------------------------------------------------------------------------------

    });

};