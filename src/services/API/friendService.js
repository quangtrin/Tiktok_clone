import axios from 'axios';
import config from '~/config';
import { acceptFriendNotification } from './notificationService';

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

const addFriend = async (friendId, socket) => {
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
        await acceptFriendNotification(friendId, socket);
        return response.status;
    } catch (error) {
        console.log(error);
    }
};

export { getFriendsUserCurrent, addFriend };
