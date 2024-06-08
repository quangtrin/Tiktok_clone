import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import CardFollow from './CardFollow';
import classNames from 'classnames/bind';
import styles from './Following.module.scss';
import { Col, Row } from 'antd';
import { updateListFollowingUser } from '~/redux/userCurrentSlice';
import { getFollowingOfCurrentUser } from '~/services/API/userService';

const cx = classNames.bind(styles);
function FollowingPage() {
    const dispatch = useDispatch();
    const listFollowingUser = useSelector((state) => state.user_current.listFollowingUser);
    const currentUser = useSelector((state) => state.user_current.information);

    useEffect(() => {
        const getDataFollowingUser = async () => {
            try {
                const followingUsers = await getFollowingOfCurrentUser();
                dispatch(updateListFollowingUser(followingUsers));
            } catch (error) {
                console.log(error);
            }
        };

        getDataFollowingUser();
    }, [dispatch, currentUser]);

    return (
        <div className={cx('follow_layout')}>
            <Row gutter={16} style={{ justifyContent: 'center' }}>
                {listFollowingUser.length === 0 ? (
                    <h2>Not following anyone</h2>
                ) : (
                    listFollowingUser.map((user) => {
                        return (
                            <Col key={user.id}>
                                <CardFollow user={user} />
                            </Col>
                        );
                    })
                )}
            </Row>
        </div>
    );
}

export default FollowingPage;
