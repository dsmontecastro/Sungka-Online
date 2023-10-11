import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../state/_store';

import { Layout, _Game } from '../../styles';

import Team from './_team';


interface Props { team: Team }

export default function Base({ team }: Props) {

    const teamBlack = team === Team.black;
    const row = (teamBlack) ? 0 : 1;
    const col = 0;

    function label(id: string) {
        return `${team.valueOf()}-${id}`;
    }

    /* ------------------------------------------ GAME-STATE ELEMENTS ----------------------------------------- */

    const turn = useSelector((state: RootState) => state.game.turn);
    const board = useSelector((state: RootState) => state.game.board);
    const updating = useSelector((state: RootState) => state.game.updating);

    const value = board[row][col];

    /* ----------------------------------------- LOBBY-STATE ELEMENTS ----------------------------------------- */

    const host = useSelector((state: RootState) => state.lobby.host);

    const mine = host === teamBlack;

    /* ------------------------------------------ ANIMATION HANDLING ------------------------------------------ */

    const [grow, setGrow] = useState<boolean>(false);

    useEffect(() => { setGrow(true); }, [value]);

    /* ------------------------------------------- STYLING ELEMENTS ------------------------------------------- */

    const style = (teamBlack) ? _Game.black : _Game.white;
    const shape = `landscape:w-3/4 portrait:h-3/4 relative ${_Game.circle}`;

    const beat = (mine && turn && !updating) ? 'animate-beat' : '';
    const _base = ` ${style} ${shape} ${beat} ${Layout.center}`;

    return (

        <div id={label('base')} className={`z-10 relative flex-1 ${Layout.fill} ${Layout.center}`}>

            <div id={label('base-circle')}
                onAnimationEnd={() => setGrow(false)}
                className={`${_base} ${grow && 'animate-grow'}`}
            > {value} </div>

        </div>

    );

}