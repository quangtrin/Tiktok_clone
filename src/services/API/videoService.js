import axios from 'axios';
import config from '~/config';

const getListVideos = async () => {
    try {
        const response = await axios.get(`${config.baseUrl}/api/video`);
        return response.data.videos;
    } catch (error) {
        console.log(error);
    }
};

const getListVideosByCreatorId = async (creatorId) => {
    try {
        const response = await axios.get(`${config.baseUrl}/api/video/creator/${creatorId}`);
        return response.data.videos;
    } catch (error) {
        console.log(error);
    }
};

const createVideo = async (video, description, song) => {
    const tokenSession = localStorage.getItem('token');
    try {
        const formData = new FormData();
        formData.append('video', video);
        formData.append('description', description);
        formData.append('song', song);
        const res = await axios.post(`${config.baseUrl}/api/video/upload`, formData, {
            headers: {
                Authorization: `Bearer ${tokenSession}`,
            },
        });
        return res.status;
    } catch (error) {
        console.log(error);
    }
};

const deleteVideo = async (videoId) => {
    const tokenSession = localStorage.getItem('token');
    try {
        const res = await axios.delete(`${config.baseUrl}/api/video/${videoId}`, {
            headers: {
                Authorization: `Bearer ${tokenSession}`,
            },
        });
        return res.status;
    } catch (error) {
        console.log(error);
    }
};

export { getListVideos, createVideo, getListVideosByCreatorId, deleteVideo };
