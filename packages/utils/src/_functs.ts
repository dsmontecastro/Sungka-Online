import { ROW } from './_consts';
import { Board } from '@shared/types';

function makeRow() {
    return [0].concat(ROW);
};

export function makeBoard(): Board {
    return [makeRow(), makeRow()] as Board;
};

export function copyBoard(board: Board): Board {
    return JSON.parse(JSON.stringify(board));
};
