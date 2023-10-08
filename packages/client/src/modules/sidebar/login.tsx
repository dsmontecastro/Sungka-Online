import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../state/_store';
import { userActions as user } from '../../state/user'

import { _Side } from '../styles';

// --------------------------------------------------------------------------------|

const LOCAL_KEY = 'name';

export default function Login() {

  const dispatch = useDispatch();

  const connected = useSelector((state: RootState) => state.user.connected);

  /* ------------------------------------------ NAME-INPUT HANDLING ----------------------------------------- */

  const [name, setName] = useState<string>('');

  useEffect(() => {
    const _name = localStorage.getItem(LOCAL_KEY);
    if (_name) setName(_name);
  }, []);

  /* -------------------------------------------- LOGIN HANDLING -------------------------------------------- */

  const [logged, setLogged] = useState<boolean>(false);

  function login() {

    const _name = name.trim();

    if (!connected) dispatch(user.connect());

    else if (_name) {
      setLogged(true);
      dispatch(user.login(_name));
      localStorage.setItem(LOCAL_KEY, _name);
    }

  }

  function logout() {
    dispatch(user.logout());
    setLogged(false);
  }

  /* ------------------------------------------- STYLING ELEMENTS ------------------------------------------- */

  const container = `pt-[0.5%] ${_Side.container}`;
  const button = `w-[60%] my-[2%] ${_Side.button}`;
  const input = `w-[85%] px-[3%] ${_Side.input}`;
  const p = `mb-[3%]`;

  /* ------------------------------------------- PAGE: USER SCREEN ------------------------------------------ */

  if (connected && logged) return (

    <div id='user' className={container}>

      <p id='user-name' className={p}> User: {name} </p>

      <button id='user-logout' className={button} onClick={logout}> LOGOUT </button>

      <div className={`mt-[5%] ${_Side.divider}`} />

    </div >

  );

  /* ------------------------------------------ PAGE: LOGIN SCREEN ------------------------------------------ */

  else return (

    <div id='login' className={container}>

      <p id='login-prompt' className={p}> Enter Username to Begin </p>

      <input id='login-name' className={input}
        type='text' maxLength={15} placeholder='1-10 characters'
        value={name} onChange={(e) => setName(e.currentTarget.value)}
      />

      <button id='login-button' className={button} onClick={login}> LOGIN </button>

    </div >

  );


}