import axios from 'axios';
import config from '~/config';

const followNotification = async (followedId, status, socket) => {
    const tokenSession = localStorage.getItem('token');
    try {
        const newNotifi = await axios.post(
            `${config.baseUrl}/api/notification/create/follow`,
            {
                receiverId: followedId,
                type: status === 200 ? config.typeNoti.follow : config.typeNoti.becomeFriend, 
            },
            {
                headers: {
                    Authorization: `Bearer ${tokenSession}`,
                },
            },
        );
        if (newNotifi.status === 200) {
            await socket?.emit('new-notification', {
                notification: newNotifi.data.newNotification,
            });
        }
    } catch (error) {
        console.log(error);
    }
};


const commentNotification = async (commentParentId, videoId, commentId, socket) => {
    const tokenSession = localStorage.getItem('token');
    try {
        if (commentParentId) {
            const newNotifi = await axios.post(
                `${config.baseUrl}/api/notification/create/comment`,
                {
                    commentParentId,
                    commentId,
                    videoId,
                    type: config.typeNoti.comment,
                },
                {
                    headers: {
                        Authorization: `Bearer ${tokenSession}`,
                    },
                },
            );
            newNotifi.data.newNotification?.map(async (noti) => {
                socket?.emit('new-notification', {
                    notification: noti,
                });
            });
        }
    } catch (error) {
        console.log(error);
    }
};

const likeVideoNotification = async (videoId, socket) => {
    const tokenSession = localStorage.getItem('token');
    try {
        if (videoId) {
            const newNotifi = await axios.post(
                `${config.baseUrl}/api/notification/create/likeVideo`,
                {
                    videoId,
                    type: config.typeNoti.likeVideo,
                },
                {
                    headers: {
                        Authorization: `Bearer ${tokenSession}`,
                    },
                },
            );

            await socket?.emit('new-notification', {
                notification: newNotifi.data.newNotification,
            });
        }
    } catch (error) {
        console.log(error);
    }
};

const getNotificationUser = async () => {
    const tokenSession = localStorage.getItem('token');
    const res = await axios.get(`${config.baseUrl}/api/notification/user`, {
        headers: {
            Authorization: `Bearer ${tokenSession}`,
        },
    });
    return res.data.notification;
};

const updateNotificationUser = async (notification) => {
    const tokenSession = localStorage.getItem('token');
    try {
        await axios.put(
            `${config.baseUrl}/api/notification/update`,
            {
                ...notification,
                read: true,
            },
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

export { followNotification, getNotificationUser, updateNotificationUser, commentNotification, likeVideoNotification };
