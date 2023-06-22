import React from 'react';
import { useSelector } from "react-redux";

const UserInfo = () => {
  const loggedUser = useSelector((state) => state.user);
  console.log(loggedUser);

  const isAdmin = loggedUser?.currentUser?.isAdmin;

  return (
    <section className='user-info'>
      <h2>Informacje o użytkowniku:</h2>
      <p><b>Nazwa: </b>{loggedUser?.currentUser?.username ?? "brak"}</p>
      {isAdmin ? (
        <p><b>Rola: </b>Administrator</p>
      ) : (
        <p><b>Rola: </b>Użytkownik</p>
      )}
    </section>
  );
};

export default UserInfo;
