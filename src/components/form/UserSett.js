import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { userRequest } from '../../services/requestMethods';
import { logout } from "../../context/redux/apiCalls";
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

const UserSett = () => {
  const loggedUser = useSelector((state) => state.user);
  const [confirmation, setConfirmation] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [logoutState2, setLogoutState2] = useState(
    user?.currentUser !== null ? "/" : "/login"
  );
  const [successMessage, setSuccessMessage] = useState('');

  console.log(loggedUser);
  console.log(newPassword);

  const deleteUser = async () => {
    try {
      if (loggedUser) {
        await userRequest.delete(`/users/${loggedUser.currentUser._id}`);
        dispatch({ type: 'LOGOUT' });
        console.log('User has been deleted');
      } else {
        console.log('No user logged in');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  const handleChangePassword = () => {
    setShowChangePassword(true);
  }

  const validatePassword = (password) => {
    // Regex pattern to validate password format
    const pattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return pattern.test(password);
  }

  const savePassword = async (e) => {
    e.preventDefault();
    if (!validatePassword(newPassword)) {
      alert('Hasło powinno zawierać przynajmniej 8 znaków, w tym: 1 znak specjalny, 1 cyfrę, 1 mały znak i 1 duży znak.');
      return;
    }
    try {
      if (loggedUser) {
        const response = await userRequest.post("/users/request-password-change", {
          email: loggedUser.currentUser.email,
          newPassword: newPassword
        });
        console.log(response.data);
        dispatch({ type: 'LOGOUT' });
        setSuccessMessage('Sprawdź swój e-mail, aby ostatecznie potwierdzić zmianę hasła!');
        setModalIsOpen(true);
      } else {
        console.log('No user logged in');
      }
    } catch (error) {
      console.error('Error changing password:', error);
    }
    setShowChangePassword(false);
  }

  const handleDeleteClick = () => {
    setConfirmation(true);
  }

  const logoutUser = () => {
    if (user?.currentUser !== null) {
      logout(dispatch);
      setLogoutState2("/login");
    } else {
      setLogoutState2("/");
    }
  }

  const handleConfirmDelete = () => {
    deleteUser();
    logoutUser();
    setConfirmation(false);
  }

  const handleCancelDelete = () => {
    setConfirmation(false);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  return (
    <section className='user-settings'>
      <div className="login-box-user-sett">
        Ustawienia konta
        <form>
          {showChangePassword ? (
            <div>
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nowe hasło"
                type="password"
                style={{
                  height: "2vw",
                  padding: "0",
                  margin: "0",
                  color: '#8d66ad',
                  textAlign: 'center',
                  backgroundColor: '#1b0749',
                  border: '2px solid #8d66ad',
                  fontWeight: "bold",
                  textShadow: "1px 1px 10px #8d66ad"
                }}
              />
              <br />
              <button className='register-form-confirm-button' onClick={savePassword}>Potwierdź</button>
              <button className='register-form-confirm-button' onClick={() => setShowChangePassword(false)}>Anuluj</button>
            </div>

          ) : (
            <a href="#" onClick={handleChangePassword}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Zmień hasło
            </a>
          )}
          <a href="#" onClick={handleDeleteClick}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Usuń konto
          </a>
          {confirmation && (
            <div>
              <p style={{ paddingTop: "2vw" }}>Czy na pewno chcesz usunąć swoje konto?</p>
              <button className='register-form-confirm-button' onClick={handleConfirmDelete}>
                <Link
                  style={{
                    padding: "0",
                    margin: "0",
                    color: "#8d66ad",
                    fontWeight: "bold",
                    textShadow: "1px 1px 10px #8d66ad"
                  }}
                  to={logoutState2}>
                  Tak
                </Link>
              </button>
              <button
                style={{
                  color: "#8d66ad",
                  fontWeight: "bold",
                  textShadow: "1px 1px 10px #8d66ad"
                }}
                className='register-form-confirm-button'
                onClick={handleCancelDelete}>
                Nie
              </button>
            </div>
          )}
        </form>
        {successMessage && (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Password Change Modal"
            style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1000
              },
              content: {
                width: '300px',
                height: '200px',
                margin: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#1b0749',
                border: '2px solid #8d66ad',
                borderRadius: '4px',
                outline: 'none',
                padding: '20px',
                color: '#8d66ad',
                fontWeight: 'bold',
                textShadow: '1px 1px 10px #8d66ad',
              }
            }}
          >
            <p>{successMessage}</p>
            <button
              style={{
                color: '#8d66ad',
                fontWeight: 'bold',
                textShadow: '1px 1px 10px #8d66ad',
                backgroundColor: '#1b0749',
                border: '2px solid #8d66ad',
                padding: '10px 20px',
                marginTop: '20px',
                cursor: 'pointer'
              }}
              onClick={closeModal}
            >
              Zamknij
            </button>
          </Modal>
        )}
      </div>
    </section>
  )
}

export default UserSett;
