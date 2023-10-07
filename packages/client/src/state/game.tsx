import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { makeBoard } from '@shared/utils';
import { Board, Move } from '@shared/types';


// #region : Utils -------------------------------------------------------------------------------------------

const dev = import.meta.env.DEV;

function equalBoards(a: Board, b: Board) {
    const _a = JSON.stringify(a);
    const _b = JSON.stringify(b);
    return _a == _b;
}

// #endregion ------------------------------------------------------------------------------------------------


// #region : State Creation ----------------------------------------------------------------------------------

export interface GameState {

    ready: boolean
    board: Board

    updating: boolean
    turn: boolean

}

const initialState: GameState = {

    ready: false,
    board: makeBoard(),

    updating: false,
    turn: false,


};

// #endregion ------------------------------------------------------------------------------------------------


// #region : Slice & Actions ---------------------------------------------------------------------------------

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {

        reset: () => initialState,
        readied: (state => { state.ready = true }),

        endTurn: (state => { state.turn = false; }),
        startTurn: (state => { state.turn = true; }),

        move: ((
            state, action: PayloadAction<Move>) => {
            if (dev) {
                console.log(`MOVE: ${action.payload}`);
                console.log(`CURR_BOARD: ${state.board}`);
            }
        }),

        update: ((
            state, action: PayloadAction<{ move: Move, value: number }>) => {

            if (!state.updating) state.updating = true;

            const [row, col] = action.payload.move;
            state.board[row][col] = action.payload.value;

        }),

        verify: ((
            state, action: PayloadAction<Board>) => {

            const board = action.payload;
            if (!equalBoards(board, state.board)) state.board = board;

            state.updating = false;

        }),

    },
});

// #endregion ------------------------------------------------------------------------------------------------


// #region : Exports ------------------------------------------------------------------------------------------

export const gameActions = gameSlice.actions;

export default gameSlice;

// #endregion ------------------------------------------------------------------------------------------------