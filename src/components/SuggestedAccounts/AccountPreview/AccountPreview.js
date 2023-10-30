import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './AccountPreview.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function AccountPreview() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img
                    className={cx('avatar')}
                    src="https://scontent.fhan5-10.fna.fbcdn.net/v/t39.30808-6/320224553_1228047001257770_2675935145000246173_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=qkx1xlngUu8AX8tYftU&_nc_oc=AQlD6zRZRb2bs12ehE80ERjNAN_H3RA_XDwR1j7UnX2zXnuKjy7-gbs-jesXqzynoHw&_nc_ht=scontent.fhan5-10.fna&oh=00_AfAcfxGo1-6PqnScZMAuCZJHz8nAcIGhV_faqnus_72b3g&oe=63BB0C1C"
                    alt=""
                />
                <div>
                    <Button className={cx('follow-btn')} primary>Follow</Button>
                </div>
            </div>

            <div className={cx('body')}>
                <p className={cx('nickname')}>
                    <strong>ninhlon</strong>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </p>
                <p className={cx('name')}>Nguyen Pham Thai Ninh</p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>8.2M </strong>
                    <span className={cx('label')}>Followers</span>
                    <strong className={cx('value')}>8.2M </strong>
                    <span className={cx('label')}>Likes</span>
                </p>
            </div>
        </div>
    );
}

export default AccountPreview;
