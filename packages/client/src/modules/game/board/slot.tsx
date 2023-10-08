import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../state/_store';
import { gameActions as game } from '../../../state/game';

import { _Game } from '../../styles';

import Team from './_team';


interface Props { col: number, team: Team }

export default function Slot({ col, team }: Props) {

    const teamBlack = team === Team.black;
    const row = (teamBlack) ? 0 : 1;

    col += 1; // Note: <col + 1> to skip 'Base' slot

    const name = `${team.valueOf()}-${col}`;

    /* ------------------------------------------ GAME-STATE ELEMENTS ----------------------------------------- */

    const turn = useSelector((state: RootState) => state.game.turn);
    const board = useSelector((state: RootState) => state.game.board);
    const moving = useSelector((state: RootState) => state.game.updating);

    const value = board[row][col];

    /* ----------------------------------------- LOBBY-STATE ELEMENTS ----------------------------------------- */

    const host = useSelector((state: RootState) => state.lobby.host);

    const mine = host === teamBlack;

    /* ----------------------------------------- PLAYER-MOVE HANDLING ----------------------------------------- */

    const dispatch = useDispatch();

    function move() { dispatch(game.move([row, col])); }

    /* ------------------------------------------ ANIMATION HANDLING ------------------------------------------ */

    const [grow, setGrow] = useState<boolean>(false);

    useEffect(() => { setGrow(true); }, [value]);

    /* ------------------------------------------- STYLING ELEMENTS ------------------------------------------- */

    const disabled = !(mine && turn) || moving || value === 0;

    const shape = `z-10 landscape:w-[10%] portrait:h-[8%] ${_Game.circle}`;
    const style = (teamBlack) ? _Game.black : _Game.white;

    return (

        <button id={name}
            onClick={move}
            disabled={disabled}
            onAnimationEnd={() => setGrow(false)}
            className={`${shape} ${style} ${grow && 'animate-grow'}`}
        > {value} </button >

    );

}