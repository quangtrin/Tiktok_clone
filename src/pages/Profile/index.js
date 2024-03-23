import { Avatar, Tooltip } from 'antd';
import Button from '~/components/Button';
import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FaShare } from 'react-icons/fa6';
import { BsThreeDots } from 'react-icons/bs';
import TabbarCustomAntd from '~/components/TabbarCustomAntd';
import './Library.scss';
import VideoUploaded from './VideoUploaded';
import { useParams } from 'react-router-dom';
import { getFollowerUser, getFollowingUser, getUserById } from '~/services/userService';
import { getListVideosByCreatorId } from '~/services/videoService';
import { follow, unFollow } from '~/services/followService';

const cx = classNames.bind(styles);

function Profile() {
    const [isFollow, setIsFollow] = useState(true);
    const [user, setUser] = useState();
    const onClickFollow = async(event) => {
        event.stopPropagation();
        await follow(user.id);
        setIsFollow(true);
    }
    const onClickUnfollow = async (event) => {
        event.stopPropagation();
        await unFollow(user.id);
        setIsFollow(false);
    }
    const { id } = useParams();
    const getUser = async () => {
        let userProfile = await getUserById(id);
        const follower = await getFollowerUser(userProfile.id);
        const following = await getFollowingUser(userProfile.id);
        const videoCreated = await getListVideosByCreatorId(userProfile.id);
        userProfile = {
            ...userProfile,
            follower,
            following,
            videoCreated
        }
        setUser(userProfile)
    };

    useEffect(() => {
        getUser();
    }, []);
    const itemsTabbar = [
        {
            key: 'video',
            label: 'Video',
            children: user ? <VideoUploaded  videos={user.videoCreated}/> : null,
        },
        {
            key: 'video liked',
            label: 'Video liked',
            children: <>hello</>,
        },
    ];
    return (
        user && (
            <div className={cx('profile-layout')} id="#Profile">
                <div className={cx('avatar-name-layout')}>
                    <Avatar
                        style={{ borderColor: 'var(--border-color)' }}
                        size={100}
                        src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                    />
                    <div style={{ marginLeft: '20px' }}>
                        <div className={cx('name')}>{user.user_name}</div>
                        <div className={cx('nickname')}>User.1</div>
                        <div>
                            {isFollow ? (
                                <Button className={cx('unfollow-btn')} outline onClick={onClickUnfollow}>
                                    Unfollow
                                </Button>
                            ) : (
                                <Button className={cx('follow-btn')} primary onClick={onClickFollow}>
                                    Follow
                                </Button>
                            )}
                        </div>
                    </div>
                    <div className={cx('icons-layout')}>
                        <div>
                            <FaShare style={{ fontSize: '25px' }} />
                        </div>
                        <div style={{ fontSize: '25px', marginLeft: '50%' }}>
                            <BsThreeDots />
                        </div>
                    </div>
                </div>
                <div className={cx('follow-profile-layout')}>
                    <div className={cx('text-layout')}>
                        <div className={cx('bold-text')}>{user.following?.length || 0}</div>
                        <div className={cx('normal-text')}>Following</div>
                    </div>
                    <div className={cx('text-layout')}>
                        <div className={cx('bold-text')}>{user.follower?.length || 0}</div>
                        <div className={cx('normal-text')}>Follower</div>
                    </div>
                    <div className={cx('text-layout')}>
                        <div className={cx('bold-text')}>67.3M</div>
                        <div className={cx('normal-text')}>Like</div>
                    </div>
                </div>
                <Tooltip title="hello">
                    <div className={cx('description-profile')}>
                        The entire Font Awesome styling toolkit is available when using React, but the syntax is
                        different from our general web-use documentation. Below you’ll find the syntax for adding
                        styling with React, with links to the general documentation which has descriptions and examples
                        for each styling tool.
                    </div>
                </Tooltip>
                <TabbarCustomAntd items={itemsTabbar} size={'large'} />
            </div>
        )
    );
}

export default Profile;
