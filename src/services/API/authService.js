import axios from 'axios';
import config from '~/config';
import Swal from 'sweetalert2';

const login = async (username, password) => {
    try {
        const response = await axios.post(`${config.baseUrl}/api/user/login`, {
            email: username,
            password: password,
        });
        console.log(response.data.token);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user.id);
        return response.data.user;
    } catch (error) {
        return undefined;
    }
};

const register = async (email, username, password, isAdmin) => {
    try {
        const response = await axios.post(`${config.baseUrl}/api/user`, {
            email: email,
            name: username,
            password: password,
            isAdmin: isAdmin,
        });
        if (response.statusText === 'Created') {
            return 200;
        }
    } catch (error) {
        Swal.fire({
            title: 'Sign up failed!',
            text: error.response.data.message,
            icon: 'error',
        });
        console.error('Error during login API call:', error);
    }
};

export { login, register };
