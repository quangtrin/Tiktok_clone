import axios from 'axios';
import config from '~/config';
import { newVideoNotification } from './notificationService';
import { MessageLogin } from '~/components/Message/Message';

const getListVideos = async () => {
    const tokenSession = localStorage.getItem('token');
    try {
        const response = await axios.get(`${config.baseUrl}/api/video`, {
            headers: {
                Authorization: `Bearer ${tokenSession}`,
            },
        });
        return response.data.videos;
    } catch (error) {
        console.log(error);
    }
};

const getVideoById = async (videoId) => {
    try {
        const response = await axios.get(`${config.baseUrl}/api/video/${videoId}`);
        return response.data.video;
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

const createVideo = async (video, description, hashtag, song, startTime, endTime, socket) => {
    const tokenSession = localStorage.getItem('token');
    if (!tokenSession) {
        MessageLogin();
        return;
    }
    try {
        const formData = new FormData();
        formData.append('video', video);
        if (description) formData.append('description', description);
        if (song) formData.append('song', song);
        if (hashtag) formData.append('hashtag', hashtag);
        if (startTime) formData.append('startTime', startTime);
        if (endTime) formData.append('endTime', endTime);
        const res = await axios.post(`${config.baseUrl}/api/video/upload`, formData, {
            headers: {
                Authorization: `Bearer ${tokenSession}`,
            },
        });
        const status = res.status;
        if (status === 200) {
            await newVideoNotification(res.data.newVideo.id, socket);
        }
        return status;
    } catch (error) {
        console.log(error);
    }
};

const deleteVideo = async (videoId) => {
    const tokenSession = localStorage.getItem('token');
    if (!tokenSession) {
        MessageLogin();
        return;
    }
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

const updateVideo = async (videoId, description, hashtag, song) => {
    const tokenSession = localStorage.getItem('token');
    if (!tokenSession) {
        MessageLogin();
        return;
    }
    try {
        const res = await axios.put(
            `${config.baseUrl}/api/video/${videoId}`,
            {
                description,
                hashtag,
                song,
            },
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

export { getListVideos, createVideo, getListVideosByCreatorId, deleteVideo, updateVideo, getVideoById };
