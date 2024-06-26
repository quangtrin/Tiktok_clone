import axios from 'axios';
import config from '~/config';
import { followNotification } from './notificationService';
import { MessageLogin } from '~/components/Message/Message';

const unFollow = async (followingUserId) => {
    const tokenSession = localStorage.getItem('token');
    if (!tokenSession) {
        MessageLogin();
        return;
    }
    try {
        const res = await axios.delete(`${config.baseUrl}/api/follow/${followingUserId}`, {
            headers: {
                Authorization: `Bearer ${tokenSession}`,
            },
        });
        return res.status;
    } catch (error) {
        console.log(error);
    }
};

const follow = async (followingUserId, socket) => {
    const tokenSession = localStorage.getItem('token');
    if (!tokenSession) {
        MessageLogin();
        return;
    }
    try {
        const res = await axios.post(
            `${config.baseUrl}/api/follow/${followingUserId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${tokenSession}`,
                },
            },
        );
        const status = res.status;
        await followNotification(followingUserId, status, socket);
        return status;
    } catch (error) {
        console.log(error);
    }
};

export { unFollow, follow };
