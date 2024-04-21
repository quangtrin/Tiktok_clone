import React from 'react';
import classNames from 'classnames/bind';
import styles from './NotificationItem.module.scss';
import { Avatar } from 'antd';
import Button from '~/components/Button';
import { timeAgoOrDateTime } from '~/utils/function';
import { useNavigate } from 'react-router-dom';
import { updateNotificationUser } from '~/services/API/notificationService';

const cx = classNames.bind(styles);

const NotificationItem = ({ notification }) => {
    const handleReadNotifi = async () => {
        await updateNotificationUser(notification);
        window.location.href = `/user/@${notification.sender.id}`;
    }
    return (
        <div className={cx('layout')} onClick={handleReadNotifi}>
            <Avatar size={55} className={cx('avatar')} src={notification.sender.avatar} />
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
