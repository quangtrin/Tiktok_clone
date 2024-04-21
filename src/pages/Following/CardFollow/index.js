import { Card, Avatar } from 'antd';
import './Library.scss';
import { useState } from 'react';
import Button from '~/components/Button';
import styles from "./CardFollow.module.scss"
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { follow, unFollow } from '~/services/API/followService';
import {useDispatch} from 'react-redux'
import { removeFollow } from '~/redux/userCurrentSlice';
import ButtonFollow from '~/components/Button/ButtonFollow';

const cx = classNames.bind(styles);
const CardFollow = ({user}) => {
    const dispatch = useDispatch();
    const [isFollow, setIsFollow] = useState(true)
    
    const navigate = useNavigate();
    return (
        <div id="CardFollow">
            <Card hoverable style={{ width: 250, marginTop: 16, height: 100 }} onClick={()  => navigate(`/user/@${user.id}`)}>
                <Card.Meta
                    avatar={<Avatar size={"large"} src={user.avatar} />}
                    title={user.user_name}
                    description={
                        <ButtonFollow isFollow={isFollow} user={user} setIsFollow={setIsFollow}/>
                    }
                />
            </Card>
        </div>
    );
};

export default CardFollow;
