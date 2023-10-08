import { createRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { MEMBERS } from '@shared/utils';

import { RootState } from '../../state/_store'
import { lobbyActions as lobby } from '../../state/lobby';

import { Layout, _Side } from '../styles';


export default function Rooms() {

    const dispatch = useDispatch();

    /* ------------------------------------------- HANDLING ROOM-ID ------------------------------------------- */

    const roomID = useSelector((state: RootState) => state.lobby.roomID);

    function exitRoom() {
        if (roomID) dispatch(lobby.exitRoom(roomID));
    }

    useEffect(() => {
        window.addEventListener('beforeunload', exitRoom);
        return () => window.removeEventListener('beforeunload', exitRoom);
    });

    /* --------------------------------------------- MAKING A ROOM -------------------------------------------- */

    const [makeName, setMakeName] = useState<string>('');
    const [makePass, setMakePass] = useState<string>('');

    function makeRoom() {
        const name = makeName.trim();
        if (name) dispatch(lobby.makeRoom({ name, pass: makePass }));
    }

    /* ------------------------------------------ JOIN-ROOM HANDLING ------------------------------------------ */

    const [joinID, setJoinID] = useState<string>('');
    const [joinPass, setJoinPass] = useState<string>('');

    function joinRoom() {
        const id = joinID.trim();
        if (id) dispatch(lobby.joinRoom({ id, pass: joinPass }));
    }

    /* -------------------------------------------- HANDLING ROOMS -------------------------------------------- */

    const rooms = useSelector((state: RootState) => state.lobby.rooms);
    const _rooms = createRef<HTMLDivElement>();

    function updateRooms() { dispatch(lobby.updateRooms()); }

    function joinFromList(id: string) {
        const pass = prompt('Enter room password:') || '';
        dispatch(lobby.joinRoom({ id, pass: pass }));
    }

    useEffect(() => {
        const wall = _rooms.current;
        if (wall) wall.scrollTop = wall.scrollHeight;
    }, [_rooms]);

    /* ------------------------------------------- STYLING ELEMENTS ------------------------------------------- */

    const host = useSelector((state: RootState) => state.lobby.host);

    const divider = `my-[3%] mb-[6%] ${_Side.divider}`;
    const button = `w-[60%] my-[3%] ${_Side.button}`;
    const input = `w-[85%] mb-[3%] px-[3%] ${_Side.input}`;
    const p = `mb-[3%]`;

    /* ---------------------------------------- PAGE: ROOM INFORMATION ---------------------------------------- */

    if (roomID) return (

        <div id='room-info' className={_Side.container}>

            <p className={p}> Room ID: <br /> {roomID} </p>

            <p className={p}>

                Versus: <br />
                {(rooms[roomID] && host)
                    ? rooms[roomID].guest.name || '-'
                    : rooms[roomID].host.name}

            </p>

            <button className={button} onClick={exitRoom}> EXIT ROOM </button>

            <div className={`mt-[3%] ${_Side.divider}`} />

        </div>

    );

    /* ---------------------------------------- PAGE: JOIN-ROOM METHODS --------------------------------------- */

    else return (

        <div id='room-empty' className={`pb-[5%] flex-1 ${Layout.colC} ${_Side.container}`}>


            {/* MAKE-ROOM ELEMENTS */}

            <input id='room-make-name' className={input}
                type='text' size={21} maxLength={21}
                value={makeName} placeholder='Room Name (1-21 char)'
                onChange={(e) => setMakeName(e.currentTarget.value)}
            />
            <input id='room-make-pass' className={input}
                type='text' size={21} maxLength={21}
                value={makePass} placeholder='Password (1-21 char)'
                onChange={(e) => setMakePass(e.currentTarget.value)}
            />
            <button className={button} onClick={makeRoom}> MAKE ROOM </button>


            {/* JOIN-ROOM ELEMENTS */}

            <div className={divider} />

            <input id='room-join-name' className={input}
                type='text' size={21} maxLength={21}
                value={joinID} placeholder='Room Id (1-21 char)'
                onChange={(e) => setJoinID(e.currentTarget.value)}
            />

            <input id='room-join-pass' className={input}
                type='text' size={21} maxLength={21}
                value={joinPass} placeholder='Password (1-21 char)'
                onChange={(e) => setJoinPass(e.currentTarget.value)}
            />

            <button className={button} onClick={joinRoom}> JOIN ROOM </button>


            {/* ROOMS WALL */}

            <div className={divider} />

            <p className={p}> Available Rooms: {Object.keys(rooms).length} </p>

            <div id='rooms-wall' ref={_rooms}
                className={`w-[90%] mb-[5%]
                    flex-1 oveflow-y-auto
                    ${Layout.col} ${_Side.bgGray}
            `}>

                {Object.keys(rooms).map((id) => {

                    const _room = rooms[id];
                    const _name = _room.name;
                    const _mems = _room.members;

                    return (
                        <button className={`w-full mb-[1%] ${_Side.button}`}
                            key={id} disabled={id === roomID}
                            onClick={() => joinFromList(id)}
                        > {_name} ( {_mems} / {MEMBERS} )
                        </button>
                    );

                })}

            </div>

            <button className={button} onClick={updateRooms}> REFRESH </button>

        </div>

    );

}