import React, { useEffect, useState } from 'react';
import styles from './SidebarAdmin.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import { Layout, Menu } from 'antd';
import { MdPersonalVideo, MdOutlineSettings } from 'react-icons/md';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './SidebarAdminLibrary.scss';

const cx = classNames.bind(styles);
const { Sider } = Layout;
const SidebarAdmin = () => {
    const navigation = useNavigate();
    const [defaultOpenKeys, setDefaultOpenKeys] = useState("user");
    const items2 = [
        {
            key: `user`,
            icon: <UserOutlined />,
            label: `User`,
        },
        {
            key: `video`,
            icon: <MdPersonalVideo />,
            label: `Video`,
        },
        // {
        //     key: `setting`,
        //     icon: <MdOutlineSettings />,
        //     label: `Setting`,
        // },
    ];

    const handleMenuClickItem = (item) => {
        navigation(`/admin/${item.key}`)
    }

    useEffect(() => {
        setDefaultOpenKeys(window.location.href.split("/").pop())
    }, [window.location.href])

    return (
        <div className={cx('layout')} id="SidebarAdmin">
            <div className={cx('logo')}>
                <Link to={'/'} className={cx('logo-link')}>
                    <img src={images.logo} alt="Tiktok" />
                </Link>
            </div>
            <Sider
                style={{
                    background: 'white',
                }}
                width={'100%'}
            >
                <Menu
                    mode="inline"
                    defaultOpenKeys={['sub1']}
                    selectedKeys={[defaultOpenKeys]}
                    style={{
                        height: '100%',
                        fontSize: '1.2rem',
                    }}
                    onClick={handleMenuClickItem}
                    items={items2}
                />
            </Sider>
        </div>
    );
};

export default SidebarAdmin;
