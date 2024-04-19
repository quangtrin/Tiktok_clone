import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Propper';
import styles from './SuggestedAccounts.module.scss';
import ButtonFollow from '../Button/ButtonFollow';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function AccountItem({ account, setIsUpdate }) {
    const navigation = useNavigate();
    const [isFollow, setIsFollow] = useState(true);

    return (
        <div>
            <div
                className={cx('account-item')}
                onClick={() => {
                    navigation(`/user/@${account.id}`);
                }}
            >
                <img className={cx('avatar')} src={account.avatar} alt="" />
                <div className={cx('item-info')}>
                    <p className={cx('nickname')}>
                        <strong>{account.user_name}</strong>
                        <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                    </p>
                    <p className={cx('name')}>
                        <b>ID:</b> {account.name_id}
                    </p>
                </div>
                <div>
                    <ButtonFollow user={account} isFollow={isFollow} setIsFollow={setIsFollow} />
                </div>
            </div>
        </div>
    );
}

export default AccountItem;
