import React from 'react';
import classNames from 'classnames/bind';
import styles from './ChatPopup.module.scss';
import ChatCard from './ChatCard/ChatCard';

const cx = classNames.bind(styles);
const ChatPopup = ({ listChat, setOpenChat }) => {
    return (
        <div className={cx('layout')}>
            <h2>Message</h2>
            {listChat?.length === 0 && <p>No message</p>}
            {listChat?.map((value, index) => (
                <ChatCard key={index} data={value} setOpenChat={setOpenChat} />
            ))}
        </div>
    );
};

export default ChatPopup;
