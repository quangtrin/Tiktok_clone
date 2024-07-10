import axios from 'axios';
import config from '~/config';
import { likeVideoNotification } from './notificationService';
import { MessageLogin, MessageSuccess } from '~/components/Message/Message';

const like = async (videoId, socket) => {
    const tokenSession = localStorage.getItem('token');
    if (!tokenSession) {
        MessageLogin();
        return;
    }
    try {
        const res = await axios.post(
            `${config.baseUrl}/api/like`,
            { video_id: videoId },
            {
                headers: {
                    Authorization: `Bearer ${tokenSession}`,
                },
            },
        );
        if (res.status === 200) await likeVideoNotification(videoId, socket);
        MessageSuccess('Liked');
        return res.status;
    } catch (error) {
        console.log(error);
    }
};

const unLike = async (videoId) => {
    const tokenSession = localStorage.getItem('token');
    if (!tokenSession) {
        MessageLogin();
        return;
    }
    try {
        const res = await axios.delete(`${config.baseUrl}/api/like`, {
            headers: {
                Authorization: `Bearer ${tokenSession}`,
            },
            data: { video_id: videoId },
        });
        MessageSuccess('Unliked');
        return res.status;
    } catch (error) {
        console.log(error);
    }
};

export { unLike, like };
