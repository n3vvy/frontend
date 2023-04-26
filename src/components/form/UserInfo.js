import React from 'react'
import { useSelector } from "react-redux";

const UserInfo = () => {
    const loggedUser = useSelector((state) => state.user);
    console.log(loggedUser);
  return (
    <section className='user-info'>
    <h21>Informacje o użytkowniku:</h21>
    <p><b>Nazwa: </b>{loggedUser?.currentUser?.username ?? "brak"}</p>
    </section>
  )
}

export default UserInfo