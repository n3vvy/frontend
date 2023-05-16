import React, { useState } from "react";
import { logout } from "../../context/redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [logoutState, setLogoutState] = useState(
    user?.currentUser !== null ? "Wyloguj" : "Zaloguj się"
  );
  const [logoutState2, setLogoutState2] = useState(
    user?.currentUser !== null ? "/" : "/login"
  );

  const handleClick = (e) => {
    if (user?.currentUser !== null) {
      e.preventDefault();
      logout(dispatch);
      setLogoutState("Zaloguj się");
      setLogoutState2("/login");
    } else {
      setLogoutState("Wyloguj");
      setLogoutState2("/");
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<LogoutIcon />}
        onClick={handleClick}
        style={{
          borderColor: "#8d66ad", // Kolor obramówki
          color: "white", // Kolor tekstu
        }}
      >
        <Link style={{ textDecoration: "none", color: "white" }} to={logoutState2}>
          {logoutState}
        </Link>
      </Button>
    </>
  );
};

export default LogoutButton;