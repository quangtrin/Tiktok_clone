import Button from '~/components/Button/Button';
import { addFollow, removeFollow } from '~/redux/userCurrentSlice';
import { follow, unFollow } from '~/services/API/followService';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './Button.module.scss'

const cx = classNames.bind(styles)
const ButtonFollow = ({ isFollow, user, setIsFollow }) => {
    const dispatch = useDispatch();
    const socket = useSelector((state) => state.socket.socket);
    const onClickFollow = async (event) => {
        event.stopPropagation();
        await follow(user.id, socket);
        dispatch(addFollow(user));
        setIsFollow(true);
    };

    const onClickUnfollow = async (event) => {
        event.stopPropagation();
        await unFollow(user.id);
        dispatch(removeFollow(user.id));
        setIsFollow(false);
    };

    return isFollow ? (
        <Button outline onClick={onClickUnfollow}>
            Unfollow
        </Button>
    ) : (
        <Button className={cx('follow-btn')} primary onClick={onClickFollow}>
            Follow
        </Button>
    );
};

export default ButtonFollow;
