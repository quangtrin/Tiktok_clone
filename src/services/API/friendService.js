import axios from 'axios';
import config from '~/config';

const getFriendsUserCurrent = async () => {
    const tokenSession = localStorage.getItem('token');
    try {
        const response = await axios.get(`${config.baseUrl}/api/friend/current`, {
            headers: {
                Authorization: `Bearer ${tokenSession}`,
            },
        });
        return response.data.friends;
    } catch (error) {
        console.log(error);
    }
};

export { getFriendsUserCurrent };
