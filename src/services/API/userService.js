import axios from 'axios';
import config from '~/config';
import { dayjsToDateTime, formatDateTime } from '~/utils/function';

const getFollowingOfCurrentUser = async () => {
    const tokenSession = localStorage.getItem('token');

    const res = await axios.get(`${config.baseUrl}/api/follow/following/current`, {
        headers: {
            Authorization: `Bearer ${tokenSession}`,
        },
    });
    return res.data.currentUser.followed_user;
};

const getFollowerOfCurrentUser = async () => {
    const tokenSession = localStorage.getItem('token');

    const res = await axios.get(`${config.baseUrl}/api/follow/follower/current`, {
        headers: {
            Authorization: `Bearer ${tokenSession}`,
        },
    });
    return res.data.currentUser.follower_user;
};

const getFollowingUser = async (followedUserId) => {
    try {
        const res = await axios.get(`${config.baseUrl}/api/follow/following/${followedUserId}`);
        return res.data.followerUsers.followed_user;
    } catch (error) {
        console.log(error);
    }
};

const getFollowerUser = async (followingUserId) => {
    let followerUsers = [];
    try {
        const res = await axios.get(`${config.baseUrl}/api/follow/follower/${followingUserId}`);
        followerUsers = res.data.followedUsers.follower_user;
    } catch (error) {
        console.log(error);
    }
    return followerUsers;
};

const getUserById = async (userId) => {
    let user = {};
    try {
        const res = await axios.get(`${config.baseUrl}/api/user/index/${userId}`);
        user = res.data.user;
    } catch (error) {
        console.log(error);
    }
    return user;
};

const getCurrentUser = async () => {
    const tokenSession = localStorage.getItem('token');
    try {
        const res = await axios.get(`${config.baseUrl}/api/user/current`, {
            headers: {
                Authorization: `Bearer ${tokenSession}`,
            },
        });
        return res.data.currentUser;
    } catch (error) {
        console.log(error);
    }
};

const updateCurrentUser = async (userName, gender, description, birthday, avatar) => {
    const tokenSession = localStorage.getItem('token');
    try {
        const formData = new FormData();
        const avatarTop = avatar?.pop();
        formData.append('avatar', avatarTop?.originFileObj);
        if (description) formData.append('description', description);
        formData.append('gender', gender);
        formData.append('userName', userName);
        if (birthday) formData.append('birthday', birthday);
        const res = await axios.post(`${config.baseUrl}/api/user/current`, formData, {
            headers: {
                Authorization: `Bearer ${tokenSession}`,
            },
        });
        return res.status;
    } catch (error) {
        console.log(error);
    }
};

const getAllUsers = async () => {
    const tokenSession = localStorage.getItem('token');
    const res = await axios.get(`${config.baseUrl}/api/user`, {
        headers: {
            Authorization: `Bearer ${tokenSession}`,
        },
    });
    return res.data.users;
};

export {
    getFollowerOfCurrentUser,
    getFollowingOfCurrentUser,
    getFollowingUser,
    getFollowerUser,
    getUserById,
    getCurrentUser,
    updateCurrentUser,
    getAllUsers,
};
