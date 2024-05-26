import { Avatar, Tooltip } from 'antd';
import Button from '~/components/Button/Button';
import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FaRegShareFromSquare } from "react-icons/fa6";
import TabbarCustomAntd from '~/components/TabbarCustomAntd/TabbarCustomAntd';
import './Library.scss';
import VideoUploaded from './ListVideoCard/ListVideoCard';
import { useParams } from 'react-router-dom';
import { getFollowerUser, getFollowingUser, getUserById } from '~/services/API/userService';
import { getListVideos, getListVideosByCreatorId } from '~/services/API/videoService';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ButtonFollow from '~/components/Button/ButtonFollow';
import { useSelector } from 'react-redux';
import { AddFriendIcon, FriendIcon } from '~/components/Icons/Icons';

const cx = classNames.bind(styles);

function ProfilePage() {
    const navigate = useNavigate();
    const [isFollow, setIsFollow] = useState(true);
    const [user, setUser] = useState();
    const { id } = useParams();
    const userCurrentId = useSelector((state) => state.user_current.information?.id);
    const isSelf = userCurrentId?.toString() === id.toString();

    useEffect(() => {
        const getUser = async () => {
            let userProfile = await getUserById(id);
            const follower = await getFollowerUser(userProfile.id);

            setIsFollow(
                follower.findIndex((user) => {
                    return user.id?.toString() === userCurrentId?.toString();
                }) !== -1,
            );
            const following = await getFollowingUser(userProfile.id);
            const videoCreated = await getListVideosByCreatorId(userProfile.id);
            const allVideos = await getListVideos();
            const videoLiked = allVideos.filter(
                (video) => video.Likes.findIndex((like) => like.user_id === userProfile.id) !== -1,
            );
            userProfile = {
                ...userProfile,
                follower,
                following,
                videoCreated,
                videoLiked,
            };

            setUser(userProfile);
        };

        getUser();
    }, [id, userCurrentId]);
    const itemsTabbar = [
        {
            key: 'video',
            label: 'Video',
            children: user ? <VideoUploaded videos={user.videoCreated} isSelf={isSelf} /> : null,
        },
        {
            key: 'video liked',
            label: 'Video liked',
            children: user ? <VideoUploaded videos={user.videoLiked} /> : null,
        },
    ];
    return (
        user && (
            <div className={cx('profile-layout')} id="#Profile">
                <div className={cx('avatar-name-layout')}>
                    <Avatar
                        style={{ borderColor: 'var(--border-color)', height: '10rem', width: '10rem' }}
                        src={user.avatar}
                    />
                    <div style={{ marginLeft: '2rem' }}>
                        <div className={cx('name')}>{user.user_name}</div>
                        <div className={cx('nickname')}>
                            <b>ID: </b>
                            {user.name_id}
                        </div>
                        <div>
                            {isSelf ? (
                                <Button
                                    className={cx('unfollow-btn')}
                                    leftIcon={<FaEdit />}
                                    outline
                                    onClick={() => {
                                        navigate('/edit_profile');
                                    }}
                                >
                                    Edit profile
                                </Button>
                            ) : (
                                <ButtonFollow isFollow={isFollow} user={user} setIsFollow={setIsFollow} />
                            )}
                        </div>
                    </div>
                    <div className={cx('icons-layout')}>
                        <div>
                            <FaRegShareFromSquare style={{ fontSize: '2.5rem' }} />
                        </div>
                        <FriendIcon width='2.5rem' className={cx("friend-icon")}/>
                        <AddFriendIcon width='2.5rem' className={cx("friend-icon")}/>
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
                <Tooltip title={user.description} placement="bottom" overlayInnerStyle={{ width: '50rem' }}>
                    <div className={cx('description-profile')}>{user.description}</div>
                </Tooltip>
                <TabbarCustomAntd items={itemsTabbar} size={'large'} />
            </div>
        )
    );
}

export default ProfilePage;
