import React from 'react';
import classNames from 'classnames/bind';
import styles from './Message.module.scss';
import Avatar from 'antd/es/avatar/avatar';
import { useSelector } from 'react-redux';
import { Image } from 'antd';
import Linkify from '~/components/Linkify/Linkify';

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
                {!message.is_image ? (
                    <div className={cx('content')}>
                        <Linkify classNameLink={cx("content-link")}>{message.content || 'Hello World'}</Linkify>
                    </div>
                ) : (
                    <div
                        className={cx('content-image')}
                        style={{
                            position: 'relative',
                            display: 'flex',
                            justifyContent: myself ? 'flex-end' : 'flex-start',
                        }}
                    >
                        <Image src={message.content} alt='loading...'/>
                    </div>
                )}
                {myself && (
                    <Avatar style={{ marginLeft: '1rem' }} className={cx('avatar')} src={message.creator_chat.avatar} />
                )}
            </div>
        </div>
    );
};

export default Message;
