import React, { useState } from 'react';
import axios from 'axios'
import Swal from 'sweetalert2';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import config from '~/config';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const LoginComponent = ({setIsLoginScreen}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleRegisterClick = (event) => {
      event.preventDefault();
      setIsLoginScreen(false);
  };
  const handleLoginClick = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${config.baseUrl}/api/user/login`, {
        email: username,
        password: password,
      });
      if (response.status === 201) {
        Swal.fire({
          title: "Sign in Successfully!",
          text: "Sign in Successfully!",
          icon: "success",  
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/")
          }
        });
      }
    } catch (error) {
      console.error('Error during login API call:', error);
    }
  };
  return (
    <div>
      <div className={cx("app-logo")}>
        <img src="https://www.saigontourist.net/uploads/destination/TrongNuoc/Hochiminh/xe-hop-on.jpg" alt="App Logo" />
      </div>
      <div className={cx("container")} id={cx("container")}>
        <div className={cx("form-container", "log-in-container")}>
          <form className={cx("form")} action="#">
            <input className={cx("input")} type="text" placeholder="User Name" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input className={cx("input")} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <div className={cx("loginForm")}>
              <div className={cx("remember-me")}>
                <input className={cx("input")} type="checkbox" id={cx("remember")} />
                <label htmlFor="remember">Forget password ?</label>
              </div>
              <button className={cx("button")} onClick={handleLoginClick}>Login</button>
            </div>
            <span className={cx("span")}>Don't have an account ?<a className={cx("register-link")} onClick={handleRegisterClick}>Register</a></span>
            <p className={cx("font-text")}>━━━━━━━ Others ━━━━━━━</p>
            <div className={cx("social-container")}>
              <button style={{ marginBottom: '10px' }} className={cx("button")}>Log in with Facebook</button>
              <button className={cx("button")}>Log in with Google</button>
            </div>
          </form>
        </div>
        <div className={cx("overlay-container")}>
          <div className={cx("overlay")}>
            <div className={cx("overlay-panel", "overlay-right")}>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RegisterComponent = ({setIsLoginScreen}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState('');

  const handleLoginClick = (event) => {
      event.preventDefault();
      setIsLoginScreen(true);
  };
  const handleRegisterClick = async (event) => {
      event.preventDefault();
      if (password !== confirmPassword) {
        alert('Password must match. ');
        return;
      }
      try {
        const response = await axios.post(`${config.baseUrl}/api/user`, {
          email: email,
          name: username,
          password: password,
          isAdmin: false,
        });
        if(response.statusText === "Created") {
          Swal.fire({
            title: "Sign up Successfully!",
            text: "Sign up Successfully!",
            icon: "success"
          });
        }
      } catch (error) {
        Swal.fire({
            title: "Sign up failed!",
            text: error.response.data.message,
            icon: "error"
          });
        console.error('Error during login API call:', error);
      }
  }
  return (
    <>
      <div className={cx("app-logo")}>
        <img src="https://www.saigontourist.net/uploads/destination/TrongNuoc/Hochiminh/xe-hop-on.jpg" alt="App Logo" />
      </div>
      <div className={cx("container")} id={cx("container")}>
        <div className={cx("form-container","register-container")}>
          <form className={cx("form")} action="#">
            <input className={cx("input")} type="text" placeholder="Enter user name" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input className={cx("input")} type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input className={cx("input")} type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input className={cx("input")} type="password" placeholder="Enter password again" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            <button className={cx("button")} onClick={handleRegisterClick}>Register</button>
            <span className={cx("span")}>Already have an account <a  className={cx("login-link")} onClick={handleLoginClick}>Login</a></span>
          </form>
        </div>
        <div className={cx("overlay-container")}>
          <div className={cx("overlay")}>
            <div className={cx("overlay-panel", "overlay-right")}>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const AuthenticationForm = () => {
  const [isLoginScreen, setIsLoginScreen] = useState(true);

  return (
    <div className={cx("layout")}>
      {isLoginScreen ? <LoginComponent setIsLoginScreen={setIsLoginScreen} /> : <RegisterComponent setIsLoginScreen={setIsLoginScreen} />}
    </div>
  );
};

export default AuthenticationForm;