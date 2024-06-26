import React, { useEffect } from 'react';
import styles from './LayoutAdmin.module.scss';
import classNames from 'classnames/bind';
import SidebarAdmin from '../components/SidebarAdmin/SidebarAdmin';
import { Avatar, Popover } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import "./LayoutAdminLibrary.scss"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const menu = () => {
    return (
        <div className={cx("menu-item")} >
            <FontAwesomeIcon icon={faSignOut} />
            <div>logout</div>
        </div>
    );
};
const LayoutAdmin = ({ children, options }) => {
    const currentUser = useSelector((state) => state.user_current.information);
    const navagation = useNavigate();
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        setLoading(true);
        if (!currentUser.id || !currentUser.is_admin) {
            navagation("/authentication");
        }
        setLoading(false);
    }, [currentUser, navagation]);
    return !loading && (
        <div className={cx('wrapper')} id='AdminLayout'>
            <SidebarAdmin />
            <div className={cx('container')}>
                <div className={cx('header-layout')}>
                    <h1>{options?.headerTitle}</h1>
                    <Popover content={menu} trigger={"click"} overlayInnerStyle={{padding: "0"}}>
                        <div style={{cursor: "pointer"}}>
                            <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmCy16nhIbV3pI1qLYHMJKwbH2458oiC9EmA&s" />
                        </div>
                    </Popover>
                </div>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
};

export default LayoutAdmin;
