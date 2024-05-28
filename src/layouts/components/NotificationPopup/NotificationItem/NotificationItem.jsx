import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './NotificationItem.module.scss';
import { Avatar } from 'antd';
import Button from '~/components/Button/Button';
import { timeAgoOrDateTime } from '~/utils/function';
import { updateHasActionNotificationUser, updateReadNotificationUser } from '~/services/API/notificationService';
import { typeNoti } from '~/config/typeNoti';
import { addFriend } from '~/services/API/friendService';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const NotificationItem = ({ notification }) => {
    const socket = useSelector((state) => state.socket.socket);
    const [hasActiton, setHasAction] = useState(notification.has_action);
    const [read, setRead] = useState(notification.read);
    const handleReadNotifi = async () => {
        await updateReadNotificationUser(notification);
        setRead(true);
        switch (notification.type) {
            case typeNoti.follow:
                window.location.href = `/user/@${notification.sender.id}`;
                break;
            case typeNoti.becomeFriend:
                window.location.href = `/user/@${notification.sender.id}`;
                break;
            case typeNoti.requestFriend:
                window.location.href = `/user/@${notification.sender.id}`;
                break;
            case typeNoti.acceptFriend:
                window.location.href = `/user/@${notification.sender.id}`;
                break;
            case typeNoti.comment:
                window.location.href = `/notification?video=${notification.video_id}&comment=${notification.comment_id}`;
                break;
            case typeNoti.likeVideo:
                window.location.href = `/notification?video=${notification.video_id}`;
                break;
            default:
                break;
        }
    };

    const handleAccept = async (e) => {
        e.stopPropagation();
        await updateHasActionNotificationUser(notification);
        setHasAction(false);
        setRead(true);
        await addFriend(notification.sender.id, socket);
        if (window.location.pathname === `/user/@${notification.sender.id}`) window.location.reload();
    };

    const handleReject = async (e) => {
        e.stopPropagation();
        await updateHasActionNotificationUser(notification);
        setHasAction(false);
        setRead(true);
    };
    return (
        <div className={cx('layout')} onClick={handleReadNotifi}>
            <Avatar
                style={{ height: '5.5rem', width: '5.5rem' }}
                className={cx('avatar')}
                src={notification.sender.avatar}
            />
            <div>
                <div className={cx('content')} style={{ color: read ? 'var(--text-tab-color)' : 'var(--text-color)' }}>
                    <b>{notification.sender.user_name} </b>
                    {notification.content}
                </div>
                <div className={cx('time')}>{timeAgoOrDateTime(notification.createdAt)}</div>
                {hasActiton && (
                    <div style={{ display: 'flex', marginTop: '1rem' }}>
                        <Button primary onClick={handleAccept}>
                            Accept
                        </Button>
                        <Button outline onClick={handleReject}>
                            Reject
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationItem;
