import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "../components/form/Navbar";
import UserInfo from "../components/form/UserSett";

const User = () => {
  return (
    <div className="home-container">
      <Helmet>
        <title>Ustawienia konta</title>
      </Helmet>
      <Navbar></Navbar>
      <div className="home-main-user">
      <section className="user-main-left">
        <UserInfo></UserInfo>
        </section>
      </div>
    </div>
  );
};

export default User;
