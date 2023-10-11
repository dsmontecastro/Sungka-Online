import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../state/_store';
import { lobbyActions as lobby } from '../../state/lobby';

import { Layout, _Side } from '../styles';


export default function Ready() {

    const name = 'ready';

    function label(id: string) {
        return `${name}-${id}`;
    }

    /* ----------------------------------------- HANDLE READY FUNCTION ---------------------------------------- */

    const ready = useSelector((state: RootState) => state.lobby.ready);
    const gameStarted = useSelector((state: RootState) => state.game.ready);

    const dispatch = useDispatch();

    function toggle() { dispatch(lobby.ready(!ready)); }

    /* ------------------------------------------- STYLING ELEMENTS ------------------------------------------- */

    const pressed = 'text-gray-300 bg-gray-900';

    return (

        <div id={label('info')} className={`${_Side.container} ${Layout.colC}`}>

            <button id={label('button')} onClick={toggle} disabled={gameStarted}
                className={`w-[60%] ${ready ? pressed : _Side.button}`}
            > READY </button>

        </div>

    );

}