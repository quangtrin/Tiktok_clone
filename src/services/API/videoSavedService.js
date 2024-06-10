import axios from 'axios';
import config from '~/config';

const saveVideo = async (videoId) => {
    const tokenSession = localStorage.getItem('token');
    try {
        await axios.post(
            `${config.baseUrl}/api/video_saved`,
            { videoId },
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

const unSaveVideo = async (videoId) => {
    const tokenSession = localStorage.getItem('token');
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
