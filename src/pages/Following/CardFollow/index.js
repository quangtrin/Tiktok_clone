import { Card, Avatar } from 'antd';
import './Library.scss';
import { useState } from 'react';
import Button from '~/components/Button';
import styles from "./CardFollow.module.scss"
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { follow, unFollow } from '~/services/followService';

const cx = classNames.bind(styles);
const CardFollow = ({user}) => {
    const [isFollow, setIsFollow] = useState(true)
    const onClickFollow = async(event) => {
        event.stopPropagation();
        await follow(user.id);
        setIsFollow(true);
    }
    const onClickUnfollow = async (event) => {
        event.stopPropagation();
        await unFollow(user.id);
        setIsFollow(false);
    }
    const navigate = useNavigate();
    return (
        <div id="CardFollow">
            <Card hoverable style={{ width: 250, marginTop: 16, height: 100 }} onClick={()  => navigate(`/user/@${user.id}`)}>
                <Card.Meta
                    avatar={<Avatar size={"large"} src="https://variety.com/wp-content/uploads/2021/04/Avatar.jpg" />}
                    title={user.user_name}
                    description={
                        isFollow ? (
                            <Button className={cx('unfollow-btn')} outline onClick={onClickUnfollow}>
                                Unfollow
                            </Button>
                        ) : (
                            <Button className={cx('follow-btn')} primary onClick={onClickFollow}>
                                Follow
                            </Button>
                        )
                    }
                />
            </Card>
        </div>
    );
};

export default CardFollow;
