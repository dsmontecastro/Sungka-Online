// Template from: https://wanago.io/2021/12/20/redux-middleware-websockets/

import io from 'socket.io-client';
import { Middleware } from 'redux';

import { EVENTS } from '@shared/utils/ts';
import { Board, Message, Move, Rooms } from '@shared/types';

import { userActions as user } from './user';
import { chatActions as chat } from './chat';
import { gameActions as game } from './game';
import { lobbyActions as lobby } from './lobby';


// #region : Constants ---------------------------------------------------------------------------------------

const dev = import.meta.env.DEV;

const host: string = import.meta.env.VITE_HOST ?? 'localhost';
const port: number = import.meta.env.VITE_PORT ?? 4000;
const uri = `${host}:${port}`;

const opt = {
  autoConnect: false,
  withCredentials: true,
  closeOnBeforeunload: false,
  transports: ['websocket', 'polling', 'flashsocket']
};

// #endregion ------------------------------------------------------------------------------------------------


const SocketHandler: Middleware = store => {

  const socket = io(uri, opt);
  socket.connect();

  if (dev) console.log(`START CONNECTION @ ${uri}`);

  // Server Connection ---------------------------------------------------------------------------------------

  if (!socket.recovered) {

    socket.on(EVENTS.SERVER._CONNECT, () => {

      const success = socket.connected;
      store.dispatch(user.connected({ id: socket.id, success }));
      if (dev) console.log(`CHECK CONNECTION: ${success} @ ${uri}`);


      // Signal Handling ---------------------------------------------------------------------------------------

      if (success) {

        // #region : Lobby Signals -----------------------------------------------------------------------------

        // Cient receives Rooms Update
        socket.on(EVENTS.SERVER.ROOMS, (rooms: Rooms) => {
          store.dispatch(lobby.roomsUpdated(rooms));
        });

        // Client successfully Exited Room
        socket.on(EVENTS.SERVER.EXITED_ROOM, () => {
          store.dispatch(lobby.roomExited());
          store.dispatch(game.reset());
          store.dispatch(chat.reset());
        });

        // Client successfully Made/Joined Room
        socket.on(EVENTS.SERVER.JOINED_ROOM, (id: string, host: boolean) => {
          store.dispatch(lobby.roomJoined({ id, host }));
        });

        // Client receives ERR: Room does not exist
        socket.on(EVENTS.SERVER.ROOM_DNE, () => {
          alert('[ERROR]: Room does not exist.');
        });

        // Client receives ERR: chosen Room is full
        socket.on(EVENTS.SERVER.ROOM_FULL, () => {
          alert('[ERROR]: Room is full.');
        });

        // Client is acknowleged as (not) Ready
        // Note: Also used during GAME_OVER signals
        socket.on(EVENTS.SERVER.READY, (state: boolean) => {
          store.dispatch(lobby.readied(state));
        });

        // Client is notified that Guest has left
        socket.on(EVENTS.SERVER.GUEST_LEFT, () => {
          alert('[WARNING]: Guest has left.');
          store.dispatch(lobby.readied(false));
          store.dispatch(game.reset());
        });

        // Client is notified that Host has left
        socket.on(EVENTS.SERVER.HOST_LEFT, () => {
          alert('[WARNING]: Host has left.');
          // Note: Paired with On(EXITED_ROOM)
        });

        // #endregion ------------------------------------------------------------------------------------------


        // #region : Chat Signals ------------------------------------------------------------------------------

        // Client receives latest Message (from self or other Client)
        socket.on(EVENTS.SERVER.MESSAGE, (message: Message) => {
          if (!document.hasFocus()) document.title = '[!] New Message...';
          store.dispatch(chat.receive(message));
        });

        // #endregion ------------------------------------------------------------------------------------------


        // #region : Game Signals ------------------------------------------------------------------------------

        // Client is told that both players are Ready
        socket.on(EVENTS.SERVER.GAME_READY, () => {
          store.dispatch(game.readied());
        });

        // Client sends Move to Server
        socket.on(EVENTS.SERVER.UPDATE, (move: Move, value: number) => {
          store.dispatch(game.update({ move, value }));
        });

        // Client compares own and Server's Boards
        socket.on(EVENTS.SERVER.BOARD, (board: Board) => {
          store.dispatch(game.verify(board));
        });

        // Client starts Turn
        socket.on(EVENTS.SERVER.TURN, () => {
          store.dispatch(game.startTurn());
        });

        // Client ends Turn
        socket.on(EVENTS.SERVER.END_TURN, () => {
          store.dispatch(game.endTurn());
        });

        // Client ties Game
        socket.on(EVENTS.SERVER.GAME_TIE, () => {
          alert('[GAME_OVER]: It\'s a TIE..?');
          store.dispatch(game.reset());
        });

        // Client wins Game
        socket.on(EVENTS.SERVER.GAME_WIN, () => {
          alert('[GAME_OVER]: You WIN!');
          store.dispatch(game.reset());
        });

        // Client loses Game
        socket.on(EVENTS.SERVER.GAME_LOSE, () => {
          alert('[GAME_OVER]: You LOSE!?');
          store.dispatch(game.reset());
        });

        // #endregion ------------------------------------------------------------------------------------------

      }

    });

  }



  // Emission Handling ---------------------------------------------------------------------------------------

  return next => action => {

    // #region : Debugging -----------------------------------------------------------------------------------

    if (dev) console.log(action);

    if (user._debug.match(action)) {
      console.log('Debugging Socket:');
      console.log(`> SOCKET.CONNECTED = ${socket.connected}`);
      console.log(`> STATE.SOCKET.CONNECTED: ${store.getState().user.connected}`);
    }

    // #endregion --------------------------------------------------------------------------------------------


    // #region : Socket Connection ---------------------------------------------------------------------------

    else if (user.connect.match(action)) {
      if (!socket.connected) {
        alert('[ERR]: Cannot contact Server! Please reload the page, or try again later.');
        socket.connect();
      }
    }

    else if (user.disconnect.match(action)) {
      if (socket.connected) {

        // Signal Emissions
        const roomID = store.getState().lobby.roomID;
        store.dispatch(lobby.exitRoom(roomID));
        socket.emit(EVENTS.CLIENT._DISCONNECT);
        socket.disconnect();

        // State Setting
        store.dispatch(lobby.roomExited());
        store.dispatch(game.reset());

      }
    }

    // #endregion --------------------------------------------------------------------------------------------


    // #region : Lobby Signals -------------------------------------------------------------------------------

    // Client attempts to Exit Room
    else if (lobby.exitRoom.match(action)) {
      socket.emit(EVENTS.CLIENT.EXIT_ROOM, action.payload);
    }

    // Client attempts to Make Room
    else if (lobby.makeRoom.match(action)) {
      const name = action.payload.name;
      const pass = action.payload.pass;
      const user = store.getState().user.user;
      socket.emit(EVENTS.CLIENT.MAKE_ROOM, name, pass, user);
    }

    // Client attempts to Join Room
    else if (lobby.joinRoom.match(action)) {
      const id = action.payload.id;
      const pass = action.payload.pass;
      const user = store.getState().user.user;
      socket.emit(EVENTS.CLIENT.JOIN_ROOM, id, pass, user);
    }

    // Client declares self as (not) Ready
    else if (lobby.ready.match(action)) {
      const ready = action.payload;
      const roomID = store.getState().lobby.roomID;
      socket.emit(EVENTS.CLIENT.READY, roomID, ready);
    }

    // #endregion --------------------------------------------------------------------------------------------


    // #region : Chat Signals --------------------------------------------------------------------------------

    // Client tries to send Message
    else if (chat.send.match(action)) {
      const text = action.payload;
      const name = store.getState().user.user;
      const roomID = store.getState().lobby.roomID;
      socket.emit(EVENTS.CLIENT.MESSAGE, roomID, name, text);
    }

    // #endregion --------------------------------------------------------------------------------------------


    // #region : Game Signals --------------------------------------------------------------------------------

    // Client tries to send Move
    else if (game.move.match(action)) {
      const move = action.payload;
      const roomID = store.getState().lobby.roomID;
      socket.emit(EVENTS.CLIENT.MOVE, roomID, move);
    }

    // #endregion --------------------------------------------------------------------------------------------


    next(action);

  }

}

export default SocketHandler;