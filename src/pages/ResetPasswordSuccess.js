import React from 'react';
import { Link } from 'react-router-dom';

function ResetPasswordSuccess() {

  return (
    <div className="home-container">
    <section className="register-confirm-main">
      <p>Hasło zostało zmienione pomyślnie!</p>
      <Link to="/login" className="register-form-login-link">
          <h4>Zaloguj się nowym hasłem!</h4>
        </Link>
      </section>
    </div>
  );
}

export default ResetPasswordSuccess;
