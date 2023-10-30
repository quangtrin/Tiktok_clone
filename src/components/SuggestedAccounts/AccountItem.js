import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Propper';
import styles from './SuggestedAccounts.module.scss';
import AccountPreview from './AccountPreview';

const cx = classNames.bind(styles);

function AccountItem() {
    const renderPreview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper>
                    <AccountPreview></AccountPreview>
                </PopperWrapper>
            </div>
        );
    };

    return (
        <div>
            <Tippy offset={[-20, 0]} interactive delay={[800, 0]} render={renderPreview} placement="bottom">
                <div className={cx('account-item')}>
                    <img
                        className={cx('avatar')}
                        src="https://scontent.fhan5-10.fna.fbcdn.net/v/t39.30808-6/320224553_1228047001257770_2675935145000246173_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=qkx1xlngUu8AX8tYftU&_nc_oc=AQlD6zRZRb2bs12ehE80ERjNAN_H3RA_XDwR1j7UnX2zXnuKjy7-gbs-jesXqzynoHw&_nc_ht=scontent.fhan5-10.fna&oh=00_AfAcfxGo1-6PqnScZMAuCZJHz8nAcIGhV_faqnus_72b3g&oe=63BB0C1C"
                        alt=""
                    />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>ninhlon</strong>
                            <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                        </p>
                        <p className={cx('name')}>Nguyen Pham Thai Ninh</p>
                    </div>
                </div>
            </Tippy>
        </div>
    );
}

export default AccountItem;
