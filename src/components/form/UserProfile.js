// UserProfile.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { publicRequest } from '../../services/requestMethods';


const UserProfile = () => {
  const { identifier } = useParams();
  const { username } = useParams();
  const [userProfile, setUserProfile] = useState(null);


  return (
    <section className='user-info'>
    <h2>Informacje o użytkowniku:</h2>
    <p><b>Nazwa użytkownika: </b>{username ?? "brak"}</p>
    <p><b>Rola: </b>{ "NIE UMIEM KURCZE"}</p>
    </section>
  );
};

export default UserProfile;
