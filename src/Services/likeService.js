import axios from 'axios';
import config from '~/config';

const tokenSession = localStorage.getItem('token');

const like = async (videoId) => {
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
    } catch (error) {
        console.log(error);
    }
};

const unLike = async (videoId) => {
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
