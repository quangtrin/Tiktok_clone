import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ChatPage.module.scss';
import SidebarChat from './SidebarChat/SidebarChat';
import Message from './Message/Message';
import { Input, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane as faPaperPlaneTop } from '@fortawesome/free-solid-svg-icons';
import { addChat, getChatUserCurrentWithOtherUser } from '~/services/API/chatService';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateListMessageCurrent } from '~/redux/chatSlice';
import { LoadingIcon } from '~/components/Icons/Icons';
import HeaderChat from './HeaderChat/HeaderChat';

const cx = classNames.bind(styles);
const ChatPage = () => {
    const dispatch = useDispatch();
    const [content, setContent] = React.useState('');
    const lastMessageRef = React.useRef(null);
    const inputRef = React.useRef(null);
    const [hasUpdate, setHasUpdate] = React.useState(false);
    const [hasUpdateListChat, setHasUpdateListChat] = React.useState(false);
    const [loadingSend, setLoadingSend] = React.useState(false);
    const [searchParams] = useSearchParams();
    const chatingUserId = useSelector((state) => state.chat.chatingCurrentUserId);
    // const chatingUserId = searchParams.get('user');
    const messages = useSelector((state) => state.chat.listMessageCurrent);
    const socket = useSelector((state) => state.socket.socket);
    const onSend = async () => {
        setLoadingSend(true);
        if (!chatingUserId) {
            message.error('Please select a user to chat');
            return;
        }
        if (!content) {
            message.error('Please enter content');
            return;
        }
        await addChat(chatingUserId, content, socket);
        setContent('');
        setHasUpdate(!hasUpdate);
        setHasUpdateListChat(!hasUpdateListChat);
        setLoadingSend(false);
    };

    useEffect(() => {
        const fecthData = async () => {
            if (chatingUserId) {
                const messages = await getChatUserCurrentWithOtherUser(chatingUserId);
                dispatch(updateListMessageCurrent(messages));
            }
        };

        fecthData();
    }, [searchParams, dispatch, chatingUserId, hasUpdate]);

    useEffect(() => {
        const handleSocket = async () => {
            await socket.on('send-message', async ({ message }) => {
                setHasUpdateListChat(!hasUpdateListChat);
                if (message.creator_id?.toString() === chatingUserId?.toString()) {
                    setHasUpdate(!hasUpdate);
                }
            });
        };

        if (socket) {
            handleSocket();
        }
    }, [socket, chatingUserId, hasUpdate, hasUpdateListChat]);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView();
        }
    }, [messages]);

    useEffect(() => {
        if (inputRef.current && !loadingSend) {
            inputRef.current.focus();
        }
    }, [loadingSend]);

    return (
        <div className={cx('layout-outter')}>
            <div className={cx('layout-inner')}>
                <div className={cx(("sidebar-layout"))}>
                    <SidebarChat hasUpdate={hasUpdateListChat} />
                </div>
                {chatingUserId && (
                    <div className={cx('container')}>
                        <HeaderChat />
                        <div className={cx('message')}>
                            {messages.map((message, index) => {
                                if (!message.is_induction) return <Message key={index} message={message} />;
                                return null;
                            })}
                            <div ref={lastMessageRef} />
                        </div>
                        <div className={cx('input-layout')}>
                            <Input
                                ref={inputRef}
                                onPressEnter={onSend}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Aa"
                                className={cx('input')}
                                disabled={loadingSend}
                            />
                            {loadingSend ? (
                                <LoadingIcon color="var(--primary)" />
                            ) : (
                                <span onClick={onSend} style={{ color: 'var(--primary)', cursor: 'pointer' }}>
                                    <FontAwesomeIcon icon={faPaperPlaneTop} className={cx('send-icon')} />
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatPage;
