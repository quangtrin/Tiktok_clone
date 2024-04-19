import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateListFollowingUser } from '~/redux/userCurrentSlice';
import { getFollowingOfCurrentUser } from '~/services/userService';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label }) {
    const dispatch = useDispatch();
    const [isUpdate, setIsUpdate] = useState(false);
    const listFollowingUser = useSelector((state)=>state.user_current.listFollowingUser)
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
    }, [isUpdate]);
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            <div className={cx('list-account')}>
            {listFollowingUser?.map((value) => (
                <AccountItem key={value.id} account={value} setIsUpdate={setIsUpdate}/>
            ))}
            </div>
        </div>
    );
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};

export default SuggestedAccounts;
