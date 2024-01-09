import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './AccountPreview.module.scss';
import Button from '~/components/Button';
import { useState } from 'react';
import axios from 'axios';
import baseUrl from '~/config/variableGlobal';

const cx = classNames.bind(styles);

function AccountPreview({ account, setIsUpdate }) {
    const tokenSession = localStorage.getItem('token');
    const [isFollow, setIsFollow] = useState(true);
    const onClickFollow = async () => {
        try {
            console.log(account);
            // await axios.post(`${baseUrl}/api/follow/${account.id}`)
        } catch (error) {}
    };
    const onClickUnfollow = async () => {
        setIsUpdate(true);
        try {
            await axios.delete(`${baseUrl}/api/follow/${account.followedUser.id}`, {
                headers: {
                    Authorization: `Bearer ${tokenSession}`,
                },
            });
        } catch (error) {
            console.log(error);
        }
        setIsUpdate(false)
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img className={cx('avatar')} src="https://variety.com/wp-content/uploads/2021/04/Avatar.jpg" alt="" />
                <div>
                    {isFollow ? (
                        <Button className={cx('unfollow-btn')} outline onClick={onClickUnfollow}>
                            Unfollow
                        </Button>
                    ) : (
                        <Button className={cx('follow-btn')} primary onClick={onClickFollow}>
                            Follow
                        </Button>
                    )}
                </div>
            </div>

            <div className={cx('body')}>
                <p className={cx('nickname')}>
                    <strong>{account.followedUser.user_name}</strong>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </p>
                <p className={cx('name')}>Nguyen Pham Thai Ninh</p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>{account.followedUserCount} </strong>
                    <span className={cx('label')}>Followers</span>
                    {/* <strong className={cx('value')}>8.2M </strong>
                    <span className={cx('label')}>Likes</span> */}
                </p>
            </div>
        </div>
    );
}

export default AccountPreview;
