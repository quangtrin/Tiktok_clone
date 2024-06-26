import axios from 'axios';
import config from '~/config';
import { MessageLogin } from '~/components/Message/Message';

const saveVideo = async (videoId) => {
    const tokenSession = localStorage.getItem('token');
    if (!tokenSession) {
        MessageLogin();
        return;
    }
    try {
        const res = await axios.post(
            `${config.baseUrl}/api/video_saved`,
            { videoId },
            {
                headers: {
                    Authorization: `Bearer ${tokenSession}`,
                },
            },
        );
        return res.status;
    } catch (error) {
        console.log(error);
    }
};

const unSaveVideo = async (videoId) => {
    const tokenSession = localStorage.getItem('token');
    if (!tokenSession) {
        MessageLogin();
        return;
    }
    try {
        await axios.delete(`${config.baseUrl}/api/video_saved`, {
            headers: {
                Authorization: `Bearer ${tokenSession}`,
            },
            data: { videoId },
        });
    } catch (error) {
        console.log(error);
    }
};

const getSavedVideosCurrent = async () => {
    const tokenSession = localStorage.getItem('token');
    if (!tokenSession) {
        MessageLogin();
        return;
    }
    try {
        const response = await axios.get(`${config.baseUrl}/api/video_saved/current`, {
            headers: {
                Authorization: `Bearer ${tokenSession}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export { saveVideo, unSaveVideo, getSavedVideosCurrent };
