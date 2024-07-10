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
import { LoadingIcon, RemoveIcon } from '~/components/Icons/Icons';
import HeaderChat from './HeaderChat/HeaderChat';
import { FaImage } from 'react-icons/fa6';
import Upload from 'antd/es/upload/Upload';
import ImageUpload from '~/components/UploadImage/UploadImage';
import ResizeImage from '~/components/ResizeImage/ResizeImage';

const cx = classNames.bind(styles);
const ChatPage = () => {
    const dispatch = useDispatch();
    const [content, setContent] = React.useState('');
    const lastMessageRef = React.useRef(null);
    const inputRef = React.useRef(null);
    const [hasUpdate, setHasUpdate] = React.useState(false);
    const [hasUpdateListChat, setHasUpdateListChat] = React.useState(false);
    const [loadingSend, setLoadingSend] = React.useState(false);
    const [loadingData, setLoadingData] = React.useState(false);
    const [searchParams] = useSearchParams();
    const chatingUserId = useSelector((state) => state.chat.chatingCurrentUserId);
    const [listImage, setListImage] = React.useState([]);
    // const chatingUserId = searchParams.get('user');
    const messages = useSelector((state) => state.chat.listMessageCurrent);
    const socket = useSelector((state) => state.socket.socket);

    const handleChangeImage = (value) => {
        const checkExist = listImage.find((image) => image.uid === value.file?.uid);
        if (checkExist) {
            return;
        }
        const fileImage = value.file?.originFileObj;
        const newImage = {
            uid: value.file?.uid,
            url: URL.createObjectURL(fileImage),
            file: fileImage,
        };
        setListImage([...listImage, newImage]);
    };

    const onRemoveImage = (uid) => {
        const newListImage = listImage.filter((image) => image.uid !== uid);
        setListImage(newListImage);
    };

    const onSend = async () => {
        setLoadingSend(true);
        if (!chatingUserId) {
            message.error('Please select a user to chat');
            return;
        }
        if (!content && listImage.length === 0) {
            message.error('Please enter content');
            return;
        }
        if (content) await addChat(chatingUserId, content, socket);
        if (listImage.length > 0) {
            await Promise.all(
                listImage.map(async (image) => {
                    await addChat(chatingUserId, '', socket, image.file);
                }),
            );
        }
        setContent('');
        setListImage([]);
        setHasUpdate(!hasUpdate);
        setHasUpdateListChat(!hasUpdateListChat);
        setLoadingSend(false);
    };

    useEffect(() => {
        const fecthData = async () => {
            if (chatingUserId) {
                // setLoadingData(true);
                const messages = await getChatUserCurrentWithOtherUser(chatingUserId);
                dispatch(updateListMessageCurrent(messages));
                // setLoadingData(false);
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
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, loadingData]);

    useEffect(() => {
        if (inputRef.current && !loadingSend) {
            inputRef.current.focus();
        }
    }, [loadingSend]);

    return (
        <div className={cx('layout-outter')}>
            <div className={cx('layout-inner')}>
                <div className={cx('sidebar-layout')}>
                    <SidebarChat hasUpdate={hasUpdateListChat} />
                </div>
                {chatingUserId && (
                    <div className={cx('container')}>
                        <HeaderChat />
                        {/* {loadingData ? (
                            <div
                                style={{
                                    height: '100vh',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <LoadingIcon size={100} color="var(--primary)" />
                            </div>
                        ) : ( */}
                            <>
                                <div className={cx('message')}>
                                    {messages.map((message, index) => {
                                        if (!message.is_induction) return <Message key={index} message={message} />;
                                        return null;
                                    })}
                                    <div ref={lastMessageRef} />
                                </div>
                                <div className={cx('input-layout')}>
                                    {listImage.length > 0 && (
                                        <div className={cx('image-view')}>
                                            {listImage.map((image, index) => (
                                                <div key={index} className={cx('image-item')}>
                                                    <div
                                                        className={cx('icon-remove-image')}
                                                        onClick={() => onRemoveImage(image.uid)}
                                                    >
                                                        <RemoveIcon />
                                                    </div>
                                                    <ResizeImage imageUrl={image.url} maxWidth={130} maxHeight={130} />
                                                </div>
                                            ))}
                                        </div>
                                    )}
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
                                        <div
                                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                        >
                                            <ImageUpload onChange={handleChangeImage}>
                                                <div
                                                    style={{
                                                        color: 'var(--primary)',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                    }}
                                                >
                                                    <FaImage className={cx('send-icon')} />
                                                </div>
                                            </ImageUpload>
                                            <div
                                                onClick={onSend}
                                                style={{ color: 'var(--primary)', cursor: 'pointer' }}
                                            >
                                                <FontAwesomeIcon icon={faPaperPlaneTop} className={cx('send-icon')} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        {/* ) */}
                        {/* } */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatPage;
