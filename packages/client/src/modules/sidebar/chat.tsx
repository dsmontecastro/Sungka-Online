import { createRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Message } from '@shared/types';

import { RootState } from '../../state/_store';
import { chatActions as chat } from '../../state/chat';

import { Layout, _Side } from '../styles';


export default function Chat() {

    const dispatch = useDispatch();

    const self = useSelector((state: RootState) => state.user.id);
    const teamBlack = useSelector((state: RootState) => state.lobby.host);

    /* ---------------------------------------- MESSAGES-LIST HANDLING ---------------------------------------- */

    const messages = useSelector((state: RootState) => state.chat.messages);
    const _messages = createRef<HTMLDivElement>();

    function clear() { dispatch(chat.clear()); }

    // Scroll-to-New
    useEffect(() => {
        const wall = _messages.current;
        if (wall) wall.scrollTop = wall.scrollHeight;
    }, [_messages]);

    /* ----------------------------------------- MESSAGE-TEXT HANDLING ---------------------------------------- */

    const [message, setMessage] = useState<string>('');

    // Send Message
    function send() {
        const _msg = message.trim();
        if (_msg) {
            dispatch(chat.send(_msg));
            setMessage('');
        }
    }

    useEffect(() => {

        function pressEnter(e: KeyboardEvent) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                send();
            }
        }

        document.addEventListener('keydown', pressEnter);
        return () => document.removeEventListener('keydown', pressEnter);

    });

    /* -------------------------------------------- STYLING ELEMENT ------------------------------------------- */

    const button = `w-[35%] ${_Side.button}`;


    return (

        <div id='chat' className={`flex-1 ${Layout.col} ${_Side.container}`}>

            <div className={`${_Side.divider}`} />

            <p className={`my-[2%]`}> CHATROOM </p>

            <div id='chat-wall' ref={_messages}
                className={`
                    w-[90%] my-[2%] px-[3%] py-[3%]
                    flex-1 overflow-y-auto
                    ${_Side.bgGray}
            `}>

                {messages?.map(({ user, userID, text, time }: Message, i: number) => {

                    const _self = userID === self;

                    if (_self) user = 'You';
                    const align = (_self) ? 'text-right' : 'text-left';
                    const color = (_self === teamBlack) ? 'text-black' : 'text-white';

                    return (
                        <div key={i} className={`mb -[5%] text-sm break-words ${color} ${align}`}
                        > [{user}]@{time}: <br /> {text} </div>
                    )

                })}
            </div>


            <textarea id='chat-message' autoFocus
                value={message} placeholder='Aa' rows={0} maxLength={50}
                onChange={(e) => setMessage(e.currentTarget.value)}
                className={`w-[90%] my-[2%] px-[3%] text-sm text-white`}
            />

            <div className={`w-full my-[2%] ${Layout.row} justify-center `}>

                <button id='chat-send' onClick={send}
                    className={`${button}`}
                > SEND </button>

                <div className='w-[15%]' />

                <button id='chat-clear' onClick={clear}
                    className={`${button}`}
                > CLEAR </button>

            </div>

        </div>

    );

}