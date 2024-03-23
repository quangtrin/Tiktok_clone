import axios from 'axios';
import config from '~/config';

const tokenSession = localStorage.getItem('token');

const getFollowingOfCurrentUser = async () => {
    const res = await axios.get(`${config.baseUrl}/api/follow/following/current`, {
        headers: {
            Authorization: `Bearer ${tokenSession}`,
        },
    });

    const followingCustom = await Promise.all(
        await res.data.currentUser.followed_user.map(async (user) => {
            const getFollower = await getFollowerUser(user.id);
            return {
                ...user,
                followedUserCount: getFollower.length,
            };
        }),
    );
    return followingCustom;
};

const getFollowerOfCurrentUser = async () => {
    const res = await axios.get(`${config.baseUrl}/api/follow/follower/current`, {
        headers: {
            Authorization: `Bearer ${tokenSession}`,
        },
    });

    const followerCustom = await Promise.all(
        await res.data.currentUser.follower_user.map(async (user) => {
            const getFollower = await getFollowerUser(user.id);
            return {
                ...user,
                followedUserCount: getFollower.length,
            };
        }),
    );
    return followerCustom;
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
        const res = await axios.get(`${config.baseUrl}/api/user/${userId}`);
        user = res.data.user;
    } catch (error) {
        console.log(error);
    }
    return user;
};

export { getFollowerOfCurrentUser, getFollowingOfCurrentUser, getFollowingUser, getFollowerUser, getUserById };
