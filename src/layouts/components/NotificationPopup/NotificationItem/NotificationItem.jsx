import React from 'react';
import classNames from 'classnames/bind';
import styles from './NotificationItem.module.scss';
import { Avatar } from 'antd';
import Button from '~/components/Button/Button';
import { timeAgoOrDateTime } from '~/utils/function';
import { updateNotificationUser } from '~/services/API/notificationService';
import { typeNoti } from '~/config/typeNoti';

const cx = classNames.bind(styles);

const NotificationItem = ({ notification }) => {
    const handleReadNotifi = async () => {
        await updateNotificationUser(notification);
        switch (notification.type) {
            case typeNoti.follow:
                window.location.href = `/user/@${notification.sender.id}`;
                break;
            case typeNoti.becomeFriend:
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
    return (
        <div className={cx('layout')} onClick={handleReadNotifi}>
            <Avatar
                style={{ height: '5.5rem', width: '5.5rem' }}
                className={cx('avatar')}
                src={notification.sender.avatar}
            />
            <div>
                <div
                    className={cx('content')}
                    style={{ color: notification.read ? 'var(--text-tab-color)' : 'var(--text-color)' }}
                >
                    <b>{notification.sender.user_name} </b>
                    {notification.content}
                </div>
                <div className={cx('time')}>{timeAgoOrDateTime(notification.createdAt)}</div>
                {notification.has_action && (
                    <div style={{ display: 'flex', marginTop: '1rem' }}>
                        <Button primary>Accept</Button>
                        <Button outline>Reject</Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationItem;
