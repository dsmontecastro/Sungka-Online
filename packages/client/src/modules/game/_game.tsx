import { useSelector } from 'react-redux';

import { RootState } from '../../state/_store';

import { Layout, _Game } from '../styles';

import Board from './board/_board';


export default function Game() {

    const teamBlack = useSelector((state: RootState) => state.lobby.host);
    const teamWhite = !teamBlack;

    /* -------------------------------------------- GAME-STAT FLAGS ------------------------------------------- */

    const turn = useSelector((state: RootState) => state.game.turn);
    const ready = useSelector((state: RootState) => state.game.ready);

    /* --------------------------------------- GAME (BACKGROUND) STYLING -------------------------------------- */

    const flow = 'landscape:bg-gradient-to-b portrait:bg-gradient-to-r';
    const background = 'from-black from-50% to-white to-50%';

    const _game = `min-w-[240px] flex-1 ${flow} ${background} ${Layout.fill}`;

    /* --------------------------------------------- SIDE STYLING --------------------------------------------- */

    const _side = `w-full h-1/3 flex-shrink portrait:hidden ${Layout.colC}`;
    const blackText = (teamBlack) ? 'Your Turn' : 'Enemy Turn';
    const whiteText = (teamWhite) ? 'Your Turn' : 'Enemy Turn';

    return (

        <div id='game' className={_game}>

            {ready &&

                <div id='game-body' className={`overflow-y-auto ${Layout.fill} ${Layout.colC}`}>

                    <div id='side-black' className={`${_side} ${_Game.black}`}>
                        {(teamBlack === turn) ? blackText : ''}
                    </div>

                    <Board />

                    <div id='side-white' className={`${_side} ${_Game.white}`}>
                        {(teamWhite === turn) ? whiteText : ''}
                    </div>


                </div>

            }

        </div>

    );

}