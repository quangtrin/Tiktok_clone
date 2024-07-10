import axios from 'axios';
import { LoginAlertDialog } from '~/components/AlertDialog/AlertDialog';
import config from '~/config';

const getListChatUserCurrent = async () => {
    const tokenSession = localStorage.getItem('token');
    if (!tokenSession) {
        LoginAlertDialog();
    }
    try {
        const response = await axios.get(`${config.baseUrl}/api/chat/list`, {
            headers: {
                Authorization: `Bearer ${tokenSession}`,
            },
        });

        const listChat = response.data;
        const chatDuplicate = listChat.map((chat) => {
            return listChat.filter(
                (chat2) =>
                    chat.receiver_id === chat2.creator_id &&
                    chat.creator_id === chat2.receiver_id &&
                    chat.created_at > chat2.created_at,
            )[0];
        });
        const filterDuplicate = listChat.filter((chat) => !chatDuplicate.includes(chat));
        const sortChat = filterDuplicate.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        return sortChat;
    } catch (error) {
        console.log(error);
    }
};

const getChatUserCurrentWithOtherUser = async (otherUserId) => {
    const tokenSession = localStorage.getItem('token');
    try {
        const response = await axios.get(`${config.baseUrl}/api/chat/messages/${otherUserId}`, {
            headers: {
                Authorization: `Bearer ${tokenSession}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const addChat = async (otherUserId, content, socket, file) => {
    const tokenSession = localStorage.getItem('token');
    try {
        const formData = new FormData();
        if (file) {
            formData.append('image', file);
        }
        formData.append('receiverId', otherUserId);
        formData.append('content', content);
        const response = await axios.post(`${config.baseUrl}/api/chat/add`, formData, {
            headers: {
                Authorization: `Bearer ${tokenSession}`,
            },
        });
        await socket?.emit('new-message', {
            message: response.data,
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const updateReadChat = async (otherUserId) => {
    const tokenSession = localStorage.getItem('token');
    try {
        const response = await axios.put(
            `${config.baseUrl}/api/chat/update/read`,
            {
                creatorId: otherUserId,
            },
            {
                headers: {
                    Authorization: `Bearer ${tokenSession}`,
                },
            },
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export { getListChatUserCurrent, getChatUserCurrentWithOtherUser, addChat, updateReadChat };
