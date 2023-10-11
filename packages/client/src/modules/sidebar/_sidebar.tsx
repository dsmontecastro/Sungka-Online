import { useSelector } from 'react-redux';

import { RootState } from '../../state/_store';

import { Layout, _Side } from '../styles'
import Login from './login';
import Rooms from './rooms';
import Ready from './ready';
import Chat from './chat';


export default function Sidebar() {

    const name = 'sidebar';

    function label(id: string) {
        return `${name}-${id}`;
    }

    /* ---------------------------------------------- STATE FLAGS --------------------------------------------- */

    const logged = useSelector((state: RootState) => state.user.user);
    const inRoom = useSelector((state: RootState) => state.lobby.roomID);


    return (

        <div id={name} className={`
            min-w-[120px] max-w-[200px]
            w-[20%] h-full overflow-y-auto
            ${_Side.bgOuter} ${Layout.center}
        `}>

            <div id={label('body')} className={`
                min-h-[600px] max-h-full
                w-[95%] h-[98%] mx-auto my-auto
                ${_Side.bgInner} ${Layout.col}
            `}>

                <Login />
                {logged && <Rooms />}
                {inRoom && <Ready />}
                {inRoom && <Chat />}

            </div>

        </div>

    );

}