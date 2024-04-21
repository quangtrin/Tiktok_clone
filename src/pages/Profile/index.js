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
import { getFollowerUser, getFollowingUser, getUserById } from '~/services/API/userService';
import { getListVideosByCreatorId } from '~/services/API/videoService';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ButtonFollow from '~/components/Button/ButtonFollow';

const cx = classNames.bind(styles);

function Profile() {
    const navigate = useNavigate();
    const [isFollow, setIsFollow] = useState(true);
    const [user, setUser] = useState();
    const { id } = useParams();
    const userCurrentId = localStorage.getItem('userId');
    const getUser = async () => {
        let userProfile = await getUserById(id);
        const follower = await getFollowerUser(userProfile.id);

        setIsFollow(
            follower.findIndex((user) => {
                return user.id == userCurrentId;
            }) !== -1,
        );
        const following = await getFollowingUser(userProfile.id);
        const videoCreated = await getListVideosByCreatorId(userProfile.id);
        userProfile = {
            ...userProfile,
            follower,
            following,
            videoCreated,
        };

        setUser(userProfile);
    };

    useEffect(() => {
        getUser();
    }, [id]);
    const itemsTabbar = [
        {
            key: 'video',
            label: 'Video',
            children: user ? <VideoUploaded videos={user.videoCreated} /> : null,
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
                    <Avatar style={{ borderColor: 'var(--border-color)' }} size={100} src={user.avatar} />
                    <div style={{ marginLeft: '2rem' }}>
                        <div className={cx('name')}>{user.user_name}</div>
                        <div className={cx('nickname')}>
                            <b>ID: </b>
                            {user.name_id}
                        </div>
                        <div>
                            {userCurrentId == id ? (
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
                                <ButtonFollow isFollow={isFollow} user={user} setIsFollow={setIsFollow}/>
                            )}
                        </div>
                    </div>
                    <div className={cx('icons-layout')}>
                        <div>
                            <FaShare style={{ fontSize: '2.5rem' }} />
                        </div>
                        <div style={{ fontSize: '2.5rem', marginLeft: '50%' }}>
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
                <Tooltip title={user.description} placement='bottom' overlayInnerStyle={{width: '50rem'}}>
                    <div className={cx('description-profile')}>
                        {user.description}
                    </div>
                </Tooltip>
                <TabbarCustomAntd items={itemsTabbar} size={'large'} />
            </div>
        )
    );
}

export default Profile;
