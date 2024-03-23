import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import CardFollow from './CardFollow';
import classNames from 'classnames/bind';
import styles from './Following.module.scss';
import { Col, Row } from 'antd';
import { updateListFollowingUser } from '~/redux/userCurrentSlice';
import { getFollowingOfCurrentUser } from '~/services/userService';

const cx = classNames.bind(styles);
function Following() {
    const dispatch = useDispatch();
    const listFollowingUser = useSelector((state) => state.user_current.listFollowingUser);
    const getDataFollowingUser = async () => {
        try {
            const followingUsers = await getFollowingOfCurrentUser();
            dispatch(updateListFollowingUser(followingUsers));
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getDataFollowingUser();
    }, []);

    return (
        <div className={cx('follow_layout')}>
            <Row gutter={16}>
                {listFollowingUser.map((user) => {
                    return (
                        <Col>
                            <CardFollow user={user} />
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
}

export default Following;
