import { Card, Avatar } from 'antd';
import './Library.scss';
import { useState } from 'react';
import styles from "./CardFriend.module.scss"
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import ButtonFollow from '~/components/Button/ButtonFollow';

const cx = classNames.bind(styles);
const CardFollow = ({user}) => {
    const [isFollow, setIsFollow] = useState(true)
    
    const navigate = useNavigate();
    return (
        <div id="CardFollow">
            <Card hoverable style={{ width: "23rem", marginTop: "1.6rem", height: "10rem" }} onClick={()  => navigate(`/user/@${user.id}`)}>
                <Card.Meta
                    avatar={<Avatar style={{width: "4rem", height: "4rem"}} src={user.avatar} />}
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
