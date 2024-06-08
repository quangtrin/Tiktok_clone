import React from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import CardFriend from './CardFriend/CardFriend';
import { updateListFriend } from '~/redux/userCurrentSlice';
import { Col, Row } from 'antd';
import styles from './ListFriendsPage.module.scss';
import { getFriendsUserCurrent } from '~/services/API/friendService';

const cx = classNames.bind(styles);
const ListFriendsPage = () => {
    const dispatch = useDispatch();
    const listFriend = useSelector((state) => state.user_current.listFriend);
    const currentUser = useSelector((state) => state.user_current.information);

    useEffect(() => {
        const getDataFriendUser = async () => {
            try {
                const friendUsers = await getFriendsUserCurrent();
                console.log(friendUsers);
                dispatch(updateListFriend(friendUsers));
            } catch (error) {
                console.log(error);
            }
        };

        getDataFriendUser();
    }, [dispatch, currentUser]);

    return (
        <div className={cx('layout')}>
            <Row gutter={16} style={{ justifyContent: 'center' }}>
                {listFriend.length === 0 ? (
                    <h2>Not have any friend</h2>
                ) : (
                    listFriend.map((user) => {
                        return (
                            <Col key={user.id}>
                                <CardFriend user={user} />
                            </Col>
                        );
                    })
                )}
            </Row>
        </div>
    );
};

export default ListFriendsPage;
