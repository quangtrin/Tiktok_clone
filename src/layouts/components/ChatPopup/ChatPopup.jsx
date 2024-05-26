import React from 'react';
import classNames from 'classnames/bind';
import styles from './ChatPopup.module.scss';
import ChatCard from './ChatCard/ChatCard';

const cx = classNames.bind(styles);
const ChatPopup = ({listChat, setOpenChat}) => {
    return (
        <div className={cx('layout')}>
            {listChat?.map((value, index) => (
                <ChatCard key={index} data={value} setOpenChat={setOpenChat}/>
            ))}
        </div>
    );
};

export default ChatPopup;
