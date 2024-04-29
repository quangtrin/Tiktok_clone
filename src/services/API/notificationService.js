import axios from 'axios';
import config from '~/config';

const followNotification = async (followedId, socket) => {
    const tokenSession = localStorage.getItem('token');
    try {
        const newNotifi = await axios.post(
            `${config.baseUrl}/api/notification/create`,
            {
                receiverId: followedId,
                type: 'follow',
            },
            {
                headers: {
                    Authorization: `Bearer ${tokenSession}`,
                },
            },
        );
        if (newNotifi.status === 200) {
            await socket?.emit('new-notification', {
                notification: newNotifi.data.newNotification,
            });
        }
    } catch (error) {
        console.log(error);
    }
};

const getNotificationUser = async () => {
    const tokenSession = localStorage.getItem('token');
    const res = await axios.get(`${config.baseUrl}/api/notification/user`, {
        headers: {
            Authorization: `Bearer ${tokenSession}`,
        },
    });
    return res.data.notification;
};

const updateNotificationUser = async (notification) => {
    const tokenSession = localStorage.getItem('token');
    try {
        await axios.put(
            `${config.baseUrl}/api/notification/update`,
            {
                ...notification,
                read: true,
            },
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

export { followNotification, getNotificationUser, updateNotificationUser };
