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

const addFriend = async (friendId) => {
    const tokenSession = localStorage.getItem('token');
    try {
        const response = await axios.post(
            `${config.baseUrl}/api/friend/add`,
            {
                friendId,
            },
            {
                headers: {
                    Authorization: `Bearer ${tokenSession}`,
                },
            },
        );
        return response.status;
    } catch (error) {
        console.log(error);
    }
};

export { getFriendsUserCurrent, addFriend };
