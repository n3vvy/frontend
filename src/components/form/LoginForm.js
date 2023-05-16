import React, { useState } from "react";
import { login } from "../../context/redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
    // console.log(error);
  };

  return (
    <>
      <section className="register-box">
        <h2>Logowanie</h2>
        <form>
          <div className="user-box">
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              id="login-form-name"
              required
            />
            <label htmlFor="login-form-name">Nazwa użytkownika: </label>
          </div>
          <div className="user-box">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              id="login-form-password"
              required
            />
            <label htmlFor="login-form-password">Hasło: </label>
          </div>
          <code>
            <p style={{ color: "red", marginTop: "10px" }}>
              {error[0]?.response?.data}
            </p>
          </code>
            <button className="login-button"
              onClick={handleClick}
              disabled={isFetching}
            >
              <a href="#">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Zaloguj się
              </a>
            </button>
          <Link to="/register">
            <h4 style={{ marginTop: "20px" }}>
              Nie masz konta? Przejdź do rejestracji
            </h4>
          </Link>
        </form>
      </section>
    </>
  );
};

export default LoginForm;
