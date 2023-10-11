import { Board } from './types';


// #region : Constants --------------------------------------------------------------------------------------

export const MEMBERS = 2;

export const SLOTS = 7;
export const PIECES = 7;
export const ROW = Array(SLOTS).fill(PIECES);

// #endregion -----------------------------------------------------------------------------------------------


// #region : Functions --------------------------------------------------------------------------------------

function makeRow() {
    return [0].concat(ROW);
};

export function makeBoard(): Board {
    return [makeRow(), makeRow()] as Board;
};

export function copyBoard(board: Board): Board {
    return JSON.parse(JSON.stringify(board));
};

// #endregion -----------------------------------------------------------------------------------------------


// #region : Socket Events ----------------------------------------------------------------------------------

export const EVENTS = {

    SERVER: {   // Emitted by SERVER & Received by CLIENT

        _DEBUG: 'debug',

        _CONNECT: 'connection',
        _DISCONNECT: 'disconnect',

        ROOMS: 'ROOMS',
        EXITED_ROOM: 'EXITED_ROOM',
        JOINED_ROOM: 'JOINED_ROOM',

        GUEST_LEFT: 'GUEST_LEFT',
        HOST_LEFT: 'HOST_LEFT',

        ROOM_DNE: 'ROOM_DNE',
        ROOM_FULL: 'ROOM_FULL',

        MESSAGE: 'MESSAGE',

        READY: 'READY',
        GAME_READY: 'GAME_READY',

        TURN: 'TURN',
        END_TURN: 'END_TURN',

        UPDATE: 'UPDATE',
        BOARD: 'BOARD',

        GAME_TIE: 'GAME_TIE',
        GAME_WIN: 'GAME_WIN',
        GAME_LOSE: 'GAME_LOSE'

    },


    CLIENT: {   // Emitted by CLIENT & Received by SERVER

        _DEBUG: 'debug',
        _CONNECT: 'connected',
        _DISCONNECT: 'disconnected',

        ROOMS: 'ROOMS',
        MAKE_ROOM: 'MAKE_ROOM',
        JOIN_ROOM: 'JOIN_ROOM',
        EXIT_ROOM: 'EXIT_ROOM',

        MESSAGE: 'MESSAGE',
        READY: 'READY',

        MOVE: 'MOVE',
        BOARD: 'BOARD',

    }

};

// #endregion -----------------------------------------------------------------------------------------------