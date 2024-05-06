import axios from 'axios';
import config from '~/config';
import { likeVideoNotification } from './notificationService';

const like = async (videoId, socket) => {
    const tokenSession = localStorage.getItem('token');
    try {
        await axios.post(
            `${config.baseUrl}/api/like`,
            { video_id: videoId },
            {
                headers: {
                    Authorization: `Bearer ${tokenSession}`,
                },
            },
        );
        await likeVideoNotification(videoId, socket);
    } catch (error) {
        console.log(error);
    }
};

const unLike = async (videoId) => {
    const tokenSession = localStorage.getItem('token');
    try {
        await axios.delete(`${config.baseUrl}/api/like`, {
            headers: {
                Authorization: `Bearer ${tokenSession}`,
            },
            data: { video_id: videoId },
        });
    } catch (error) {
        console.log(error);
    }
};

export { unLike, like };
