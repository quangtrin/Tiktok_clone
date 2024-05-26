import React from 'react';
import classNames from 'classnames/bind';
import styles from './SidebarChat.module.scss';
import ChatCard from './ChatCard/ChatCard';
import { getListChatUserCurrent } from '~/services/API/chatService';
import { useDispatch, useSelector } from 'react-redux';
import { updateListChatCard } from '~/redux/chatSlice';

const cx = classNames.bind(styles);
const SidebarChat = ({ hasUpdate }) => {
    const dispatch = useDispatch();
    const listChat = useSelector((state) => state.chat.listChatCard);
    React.useEffect(() => {
        const fecthData = async () => {
            const listChat = await getListChatUserCurrent();
            dispatch(updateListChatCard(listChat));
        };

        fecthData();
    }, [dispatch, hasUpdate]);

    return (
        <div className={cx('layout')}>
            {listChat?.map((value, index) => (
                <ChatCard key={index} data={value} />
            ))}
        </div>
    );
};

export default SidebarChat;
