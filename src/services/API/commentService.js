import axios from 'axios';
import config from '~/config';
import { replyNotification, commentNotification } from './notificationService';
import { LoginAlertDialog } from '~/components/AlertDialog/AlertDialog';
import Swal from 'sweetalert2';
import { MessageLogin } from '~/components/Message/Message';

const getCommentsByVideoId = async (videoId) => {
    const res = await axios.get(`${config.baseUrl}/api/comment/video/${videoId}`);
    return res.data;
};

const postComments = async (videoId, content, socket, commentParentId) => {
    const tokenSession = localStorage.getItem('token');
    if (!tokenSession) {
        MessageLogin();
    }
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
        if (commentParentId) {
            await replyNotification(commentParentId, newComment.video_id, newComment.id, socket);
        } else await commentNotification(newComment.video_id, newComment.id, socket);
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
