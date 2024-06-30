import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './HeaderChat.module.scss';
import { useSelector } from 'react-redux';
import { Avatar } from 'antd';

const cx = classNames.bind(styles);
const HeaderChat = () => {
    const chatingCurrentUserId = useSelector((state) => state.chat.chatingCurrentUserId);
    const listChat = useSelector((state) => state.chat.listChatCard);
    const [userChattingCurrent, setUserChattingCurrent] = useState(null);
    useEffect(() => {
        if (chatingCurrentUserId) {
            const user = listChat.find((value) => value.user_id === chatingCurrentUserId);
            setUserChattingCurrent(user);
        }
    }, [chatingCurrentUserId, listChat]);
    return (
        userChattingCurrent ? (
            <div className={cx('layout-header')}>
                <Avatar src={userChattingCurrent?.avatar} size={"large"}/>
                <span style={{fontWeight: 600, marginLeft: "1rem"}}>{userChattingCurrent?.user_name}</span>
            </div>
        ) : <></>
    );
};

export default HeaderChat;
