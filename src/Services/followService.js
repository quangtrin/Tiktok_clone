import axios from 'axios';
import config from '~/config';

const tokenSession = localStorage.getItem('token');

const unFollow = async (followingUserId) => {
    try {
        await axios.delete(`${config.baseUrl}/api/follow/${followingUserId}`, {
            headers: {
                Authorization: `Bearer ${tokenSession}`,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

const follow = async (followingUserId) => {
    try {
        await axios.post(
            `${config.baseUrl}/api/follow/${followingUserId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${tokenSession}`,
                },
            },
        );
    } catch (error) {
        console.log(error);
    }
};

export { unFollow, follow };
