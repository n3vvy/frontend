// UserProfile.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { publicRequest } from '../../services/requestMethods';


const UserProfile = () => {
  const { identifier } = useParams();
  const { username } = useParams();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        let res;
        if (!isNaN(identifier)) {
          // Jeśli identifier jest liczbą, to wyszukaj profil po ID
          res = await publicRequest.get(`/users/profileById/${identifier}`);
        } else {
          // W przeciwnym razie wyszukaj profil po nazwie użytkownika
          res = await publicRequest.get(`/users/profile/${identifier}`);
        }
        setUserProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserProfile();
  }, [identifier]);

  return (
    <section className='user-info'>
    <h2>Informacje o użytkowniku:</h2>
    <p><b>Nazwa użytkownika: </b>{username ?? "brak"}</p>
    </section>
  );
};

export default UserProfile;
