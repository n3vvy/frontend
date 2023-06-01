import React from 'react';
import UserProfile from '../components/form/UserProfile';
import Navbar from "../components/form/Navbar";
import { useParams } from 'react-router-dom';
import UsersPost from "../components/form/UsersPost";
import { Helmet } from 'react-helmet';

const UserProfilePage = () => {
  const { username, user_id } = useParams();

  return (
    <div className="home-container">
        <Helmet>
          <title>Profil użytkownika - {username}</title>
        </Helmet>
        <Navbar></Navbar>
        <div className="home-main-user">
          <section className="user-main-left">
            <UserProfile username={username} />
          </section>
          <section className="user-main-right">
            <UsersPost username={username} user_id={user_id} />
          </section>
        </div>
      </div>
  );
};

export default UserProfilePage;
