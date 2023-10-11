import { MEMBERS } from '../../shared/utils';
import { Board, Move, Update } from '../../shared/types';


export function userMove(board: Board, move: Move): [Update[], Board, boolean] {

    const SLOTS = board[0].length;
    const [team, slot] = move;
    let row = team;
    let col = slot;

    // Update Tracking
    const updates: Update[] = [];

    function addUpdate(r: number, c: number) {

        const update: Update = {
            move: [r, c],
            value: board[r][c],
        };

        updates.push(update);

    }

    // Move Handling
    while (true) {

        let pieces = board[row][col];
        board[row][col] = 0;

        addUpdate(row, col);

        while (pieces > 0) {

            col += 1;

            // Change Rows
            if (col === SLOTS) {
                row = (row + 1) % 2;
                col = (row === team) ? 0 : 1;
            }

            board[row][col] += 1;
            pieces -= 1;

            addUpdate(row, col);

        }

        // If Move ends at Base, get an Extra Turn
        if (row === team && col === 0) return [updates, board, true];

        // If Move ends at Empty Slot (excluding last piece), finalize & End Turn
        else if (board[row][col] <= 1) break;

        // Else, repeat process with curren position as Move

    }


    // If Move ends on own Row, perform a 'Capture'
    // => Take all pieces from both the landing & opposing Slots
    if (row === team) {

        // Capture own Slot
        let capture = board[row][col];
        board[row][col] = 0;
        addUpdate(row, col);

        // Go to opposing Slot
        col = Math.abs(SLOTS - col);
        row = (row + 1) % 2;

        // Capture opposing Slot
        capture += board[row][col];
        board[row][col] = 0;
        addUpdate(row, col);

        // Add Captured pieces to Base
        board[team][0] += capture;
        addUpdate(team, 0);

    }


    // Gain Extra Turn if Enemy has no valid Move
    const enemy = (team + 1) % MEMBERS;
    const enemyRow = board[enemy].slice(1);
    const extraTurn = enemyRow.every((i) => i === 0);


    // Return the following:
    return [updates, board, extraTurn];

};


export function gameEnd(board: Board): number {

    const slotsBlack = board[0].slice(1);
    const slotsWhite = board[1].slice(1);

    const end
        = slotsBlack.every(i => i === 0)
        && slotsWhite.every(i => i === 0);

    if (end) {

        const baseBlack = board[0][0];
        const baseWhite = board[1][0];

        if (baseBlack === baseWhite) return 2;
        else return (baseBlack > baseWhite) ? 0 : 1;

    }

    else return -1;
}