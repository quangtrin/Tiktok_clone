import React from 'react';
import classNames from 'classnames/bind';
import styles from './NotificationPopup.module.scss';
import NotificationItem from './NotificationItem/NotificationItem';

const cx = classNames.bind(styles);
const NotificationPopup = ({ notifications }) => {
    return (
        <div className={cx('layout')}>
            <h2>Notification</h2>
            {notifications.length === 0 && <p>No notification</p>}
            <div style={{ maxHeight: '55rem', overflowY: 'scroll' }}>
                {notifications.map((notifi) => {
                    return <NotificationItem key={notifi.id} notification={notifi} />;
                })}
            </div>
        </div>
    );
};

export default NotificationPopup;
