import React from 'react';
import classNames from 'classnames/bind';
import styles from './Message.module.scss';
import Avatar from 'antd/es/avatar/avatar';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);
const Message = ({ message }) => {
    const userCurrentId = useSelector((state) => state.user_current.information.id);
    const myself = userCurrentId?.toString() === message.creator_id?.toString();
    return (
        <div className={cx(myself ? 'myself' : 'yourself')}>
            <div className={cx('layout')}>
                {!myself && (
                    <Avatar
                        style={{ marginRight: '1rem' }}
                        className={cx('avatar')}
                        src={message.creator_chat.avatar}
                    />
                )}
                <div className={cx('content')}>{message.content || 'Hello World'}</div>
                {myself && (
                    <Avatar style={{ marginLeft: '1rem' }} className={cx('avatar')} src={message.creator_chat.avatar} />
                )}
            </div>
        </div>
    );
};

export default Message;
