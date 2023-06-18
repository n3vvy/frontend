import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../../context/redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const policyRef = {
    policy1: useRef(null),
    policy2: useRef(null),
    policy3: useRef(null),
  };

  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    const policy = {
      policy1: policyRef.policy1.current.checked,
      policy2: policyRef.policy2.current.checked,
      policy3: policyRef.policy3.current.checked,
    };

    // Walidacja nazwy użytkownika
    if (username.length < 4 || username.length > 20 || /[^A-Za-z0-9]/.test(username)) {
      alert("Nazwa użytkownika nie spełnia wymagań. Powinna zawierać od 4 do 20 znaków alfanumerycznych.");
      return;
    }

    // Walidacja adresu e-mail
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Niepoprawny adres e-mail.");
      return;
    }

    // Walidacja hasła
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(password)) {
      alert(
        "Niepoprawne hasło. Powinno zawierać przynajmniej 8 znaków, w tym: 1 znak specjalny, 1 cyfrę, 1 małą literę, 1 dużą literę."
      );
      return;
    }

    register(dispatch, { username, password, email, passwordConfirm, policy });
  };

  return (
    <section className="login-box">
      <div className="logo">
        <h2>Rejestracja</h2>
      </div>
      <form>
        <div className="user-box">
          <input
            type="text"
            id="register-form-name"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="register-form-name">Nazwa użytkownika</label>
        </div>
        <div className="user-box">
          <input
            type="text"
            id="register-form-email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="register-form-email">E-mail</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            id="register-form-password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="register-form-password">Hasło</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            id="register-form-confirm-password"
            required
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <label htmlFor="register-form-confirm-password">Potwierdź hasło</label>
        </div>
        <section className="register-form-accept">
          <div className="user-box">
            <input type="checkbox" id="register-form-confirm-policy" ref={policyRef.policy1} />
            <label htmlFor="register-form-confirm-policy">
              Zapoznałem/am się z Regulaminem forum Nevvy
            </label>
          </div>
          <div className="user-box">
            <input type="checkbox" id="register-form-confirm-policy2" ref={policyRef.policy2} />
            <label htmlFor="register-form-confirm-policy2">Zgadzam się z Warunkami użytkowania</label>
          </div>
          <div className="user-box">
            <input type="checkbox" id="register-form-confirm-policy3" ref={policyRef.policy3} />
            <label htmlFor="register-form-confirm-policy3">Wysyłaj wiadomości i aktualizacje</label>
          </div>
        </section>
        <code>
          <p style={{ color: "red", marginTop: "10px" }}>{error[0]?.response?.data}</p>
        </code>
        <button className="register-form-confirm-button" onClick={handleClick} disabled={isFetching}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          UTWÓRZ NOWE KONTO
        </button>
        <Link to="/login" className="register-form-login-link">
          <h4>Posiadasz już konto? Przejdź do logowania</h4>
        </Link>
      </form>
    </section>
  );
};

export default RegisterForm;
