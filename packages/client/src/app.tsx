import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { userActions as user } from './state/user';

import BreakPoints from './_debug/breakpoints';

import { Layout } from './modules/styles';
import Sidebar from './modules/sidebar/_sidebar';
import Game from './modules/game/_game';
import Help from './modules/_help';


const title = import.meta.env.VITE_TITLE;

export default function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    function disconnect() {
      dispatch(user.disconnect());
    }

    window.addEventListener('beforeunload', disconnect);
    return () => removeEventListener('beforeunload', disconnect);

  }, [dispatch]);


  function onFocus() {
    if (document.title != title) document.title = title;
  }

  useEffect(() => {
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus)
  });

  /* --------------------------------------- HELP-VISIBILITY HANDLING --------------------------------------- */

  const [visible, setVisibility] = useState<boolean>(false);

  function toggleHelp() { setVisibility(!visible); }

  const shape = 'h-[25px] aspect-square';
  const color = 'text-white bg-gray-700';
  const align = 'z-50 absolute right-[5px] top-[5px]';

  const _button = `${shape} ${color} ${align} ${Layout.center}`;


  return <>

    <BreakPoints />

    <button id='help-button' onClick={toggleHelp} className={_button}
    > {visible ? '✖' : '?'} </button>

    {visible && <Help />}

    <div className={`relative ${Layout.fill} ${Layout.rowC}`}>
      <Sidebar />
      <Game />
    </div>

  </>;

}