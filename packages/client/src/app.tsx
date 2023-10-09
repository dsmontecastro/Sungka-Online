import { useEffect, useState } from 'react';

import BreakPoints from './_debug/breakpoints';

import { Layout } from './modules/styles';
import Sidebar from './modules/sidebar/_sidebar';
import Game from './modules/game/_game';
import Help from './modules/_help';


export default function App() {

  function onFocus() {
    if (document.title != TITLE) document.title = TITLE;
  }

  useEffect(() => {
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus)
  });

  /* --------------------------------------- HELP-VISIBILITY HANDLING --------------------------------------- */

  const [visible, setVisibility] = useState<boolean>(false);

  function toggleHelp() { setVisibility(!visible); }

  const shape = "h-[25px] aspect-square";
  const color = "text-white bg-gray-700";
  const align = "z-50 absolute right-[5px] top-[5px]";

  const _button = `${shape} ${color} ${align} ${Layout.center}`;


  return <>

    <BreakPoints />

    <button id="help-button" onClick={toggleHelp} className={_button}
    > {visible ? "✖" : "?"} </button>

    {visible && <Help />}

    <div className={`relative ${Layout.fill} ${Layout.rowC}`}>
      <Sidebar />
      <Game />
    </div>

  </>

}