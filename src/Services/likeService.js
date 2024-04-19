import axios from 'axios';
import config from '~/config';

const like = async (videoId) => {
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
