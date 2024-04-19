import axios from 'axios';
import config from '~/config';

const getComments = () => {};

const postComments = async (videoId, content, commentParentId) => {
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
        return response.data.newComment;
    } catch (error) {
        console.log(error);
    }
};

export { getComments, postComments };
