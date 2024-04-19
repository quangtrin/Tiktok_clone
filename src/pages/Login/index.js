import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { useNavigate } from 'react-router-dom';
import { login, register } from '~/services/authService';
import { useDispatch } from 'react-redux';
import { updateInformation } from '~/redux/userCurrentSlice';

const cx = classNames.bind(styles);

const LoginComponent = ({ setIsLoginScreen }) => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleRegisterClick = (event) => {
        event.preventDefault();
        setIsLoginScreen(false);
    };
    const handleLoginClick = async (event) => {
        if (username !== '' && password !== '') {
            event.preventDefault();
            const user = await login(username, password);
            if (user) {
                Swal.fire({
                    title: 'Login successfully!',
                    text: 'Login successfully!',
                    icon: 'success',
                }).then((result) => {
                    if (result.isConfirmed) {
                        dispatch(updateInformation(user));
                        navigate('/');
                    }
                });
            } else {
                Swal.fire({
                    title: 'Login failed!',
                    text: 'Account or password incorrect!',
                    icon: 'error',
                });
            }
        }
    };
    useEffect(() => {
        localStorage.clear();
    }, []);
    return (
        <div>
            <div className={cx('app-logo')}>
                <img
                    src="https://www.saigontourist.net/uploads/destination/TrongNuoc/Hochiminh/xe-hop-on.jpg"
                    alt="App Logo"
                />
            </div>
            <div className={cx('container')} id={cx('container')}>
                <div className={cx('form-container', 'log-in-container')}>
                    <form className={cx('form')} action="#">
                        <input
                            className={cx('input')}
                            type="text"
                            placeholder="User Name"
                            value={username}
                            required
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            className={cx('input')}
                            type="password"
                            placeholder="Password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className={cx('loginForm')}>
                            <div className={cx('remember-me')}>
                                <input className={cx('input')} type="checkbox" id={cx('remember')} />
                                <label htmlFor="remember">Forget password ?</label>
                            </div>
                            <button className={cx('button')} onClick={handleLoginClick}>
                                Login
                            </button>
                        </div>
                        <span className={cx('span')}>
                            Don't have an account ?
                            <a className={cx('register-link')} onClick={handleRegisterClick}>
                                Register
                            </a>
                        </span>
                        <p className={cx('font-text')}>━━━━━━━ Others ━━━━━━━</p>
                        <div className={cx('social-container')}>
                            <button style={{ marginBottom: '1rem' }} className={cx('button')}>
                                Log in with Facebook
                            </button>
                            <button className={cx('button')}>Log in with Google</button>
                        </div>
                    </form>
                </div>
                <div className={cx('overlay-container')}>
                    <div className={cx('overlay')}>
                        <div className={cx('overlay-panel', 'overlay-right')}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const RegisterComponent = ({ setIsLoginScreen }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleLoginClick = (event) => {
        event.preventDefault();
        setIsLoginScreen(true);
    };
    const handleRegisterClick = async (event) => {
        if (password !== confirmPassword) {
            alert('Password must match. ');
            return;
        }
        if (email !== '' && username !== '' && password !== '' && confirmPassword !== '') event.preventDefault();
        const status = await register(email, username, password, false);

        if (status === 200) {
            Swal.fire({
                title: 'Sign up Successfully!',
                text: 'Sign up Successfully!',
                icon: 'success',
            }).then((result) => {
                if (result.isConfirmed) {
                    setIsLoginScreen(true);
                }
            });
        }
    };

    useEffect(() => {
        localStorage.clear();
    }, []);
    return (
        <>
            <div className={cx('app-logo')}>
                <img
                    src="https://www.saigontourist.net/uploads/destination/TrongNuoc/Hochiminh/xe-hop-on.jpg"
                    alt="App Logo"
                />
            </div>
            <div className={cx('container')} id={cx('container')}>
                <div className={cx('form-container', 'register-container')}>
                    <form className={cx('form')} action="#">
                        <input
                            className={cx('input')}
                            type="text"
                            placeholder="Enter user name"
                            value={username}
                            required
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            className={cx('input')}
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className={cx('input')}
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            className={cx('input')}
                            type="password"
                            placeholder="Enter password again"
                            value={confirmPassword}
                            required
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button className={cx('button')} onClick={handleRegisterClick}>
                            Register
                        </button>
                        <span className={cx('span')}>
                            Already have an account{' '}
                            <a className={cx('login-link')} onClick={handleLoginClick}>
                                Login
                            </a>
                        </span>
                    </form>
                </div>
                <div className={cx('overlay-container')}>
                    <div className={cx('overlay')}>
                        <div className={cx('overlay-panel', 'overlay-right')}></div>
                    </div>
                </div>
            </div>
        </>
    );
};

const AuthenticationForm = () => {
    const [isLoginScreen, setIsLoginScreen] = useState(true);

    return (
        <div className={cx('layout')}>
            {isLoginScreen ? (
                <LoginComponent setIsLoginScreen={setIsLoginScreen} />
            ) : (
                <RegisterComponent setIsLoginScreen={setIsLoginScreen} />
            )}
        </div>
    );
};

export default AuthenticationForm;
