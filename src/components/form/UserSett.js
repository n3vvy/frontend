import React from 'react';
import { useSelector } from "react-redux";
const UserInfo = () => {
    const loggedUser = useSelector((state) => state.user);
    console.log(loggedUser);
  return (
    
    <section className='user-settings'>
    {/* <button className='user-settings-button' onClick={myFunction()}>Zmień hasło</button>
    <button className='user-settings-button' onClick={myFunction()}>Usuń konto</button> */}
    <div class="login-box-user-sett">
        Ustawienia konta
        <form>
          <a href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Zmień hasło
          </a>
          <a href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Usuń konto
          </a>
        </form>
      </div>
    </section>
  )
}

export default UserInfo