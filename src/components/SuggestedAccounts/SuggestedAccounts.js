import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';
import axios from 'axios';
import baseUrl from '~/config/variableGlobal';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label }) {
    const [followingUsers, setFollowingUsers] = useState([]);
    const tokenSession = localStorage.getItem('token');
    const getDataFollowingUser = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/follow/followed`, {
                headers: {
                    Authorization: `Bearer ${tokenSession}`,
                },
            });
            const followingUser = await Promise.all(
                // await followedUser = await axios.get(`${baseUrl}/api/followedUser/${}`)
                await res.data.followedUsers.map(async (user) => {
                    const getFollowed = await axios.get(`${baseUrl}/api/user/followedUser/${user.followed_user_id}`);
                    return {
                        ...user,
                        followedUserCount: getFollowed.data.followedUsers.length
                    }
                }),
            );
            setFollowingUsers(followingUser);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getDataFollowingUser();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {followingUsers?.map((value) => (
                <AccountItem account={value} />
            ))}
            <p className={cx('more-btn')}>See all</p>
        </div>
    );
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};

export default SuggestedAccounts;
