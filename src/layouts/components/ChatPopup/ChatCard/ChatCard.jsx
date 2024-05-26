import React from 'react';
import classNames from 'classnames/bind';
import styles from './ChatCard.module.scss';
import { Avatar } from 'antd';
import { timeAgoOrDateTime } from '~/utils/function';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeChatingCurrentUserId } from '~/redux/chatSlice';
import { updateReadChat } from '~/services/API/chatService';
import { updateRead } from '~/redux/chatSlice';

const cx = classNames.bind(styles);
const ChatCard = ({ data, setOpenChat }) => {
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const userCurrentId = useSelector((state) => state.user_current.information?.id);
    const handleClick = async () => {
        if (!data.read) {
            await updateReadChat(data.user_id);
            dispatch(updateRead(data.user_id));
        }
        dispatch(changeChatingCurrentUserId(data.user_id));
        navigation(`/chat?user=${data.user_id}`);
        setOpenChat(false);
    };

    return (
        <div className={cx('layout')} onClick={handleClick}>
            <Avatar style={{ height: '5.5rem', width: '5.5rem' }} className={cx('avatar')} src={data.avatar} />
            <div className={cx('layout-text')}>
                <div className={cx('title')} style={{ color: 'var(--text-color)' }}>
                    <b className={cx('name')}>{data.user_name}</b>
                    <div className={cx('time')}>{timeAgoOrDateTime(data.created_at)}</div>
                </div>
                <div
                    className={cx('content')}
                    style={{
                        fontWeight: !data.read && userCurrentId.toString() !== data.creator_id.toString() && 600,
                    }}
                >
                    {data.is_induction
                        ? 'You two are friends, let`s chat something'
                        : `${data.creator_id.toString() === userCurrentId.toString() ? 'You' : data.user_name}: ${
                              data.content
                          }`}
                </div>
            </div>
        </div>
    );
};

export default ChatCard;
