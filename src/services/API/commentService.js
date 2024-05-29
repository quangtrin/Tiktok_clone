import axios from 'axios';
import config from '~/config';
import { commentNotification } from './notificationService';

const getCommentsByVideoId = async (videoId) => {
    const res = await axios.get(`${config.baseUrl}/api/comment/video/${videoId}`);
    return res.data;
};

const postComments = async (videoId, content, socket, commentParentId) => {
    const tokenSession = localStorage.getItem('token');
    try {
        const response = await axios.post(
            `${config.baseUrl}/api/comment`,
            {
                videoId: videoId,
                commentParentId: commentParentId || null,
                content,
            },
            {
                headers: {
                    Authorization: `Bearer ${tokenSession}`,
                },
            },
        );

        const newComment = response.data.newComment;

        await commentNotification(commentParentId, newComment.video_id, newComment.id, socket);
        return newComment;
    } catch (error) {
        console.log(error);
    }
};

const deleteComment = async (commentId) => {
    const tokenSession = localStorage.getItem('token');
    try {
        const res = await axios.delete(`${config.baseUrl}/api/comment/${commentId}`, {
            headers: {
                Authorization: `Bearer ${tokenSession}`,
            },
        });
        return res.status;
    } catch (error) {
        console.log(error);
    }
};

export { getCommentsByVideoId, postComments, deleteComment };
