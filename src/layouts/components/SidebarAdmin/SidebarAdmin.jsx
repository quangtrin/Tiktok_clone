import React from 'react'
import styles from './SidebarAdmin.module.scss'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import images from '~/assets/images';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import "./SidebarAdminLibrary.scss"

const cx = classNames.bind(styles)
const { Sider } = Layout; 
const SidebarAdmin = () => {

  const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
    };
  });

  return (
    <div className={cx("layout")} id='SidebarAdmin'>
      <div className={cx('logo')}>
          <Link to={'/'} className={cx('logo-link')}>
              <img src={images.logo} alt="Tiktok" />
          </Link>
      </div>
      <Sider
            style={{
              background: "white",
            }}
            width={"100%"}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{
                height: '100%',
                fontSize: "1.2rem",
              }}
              items={items2}
            />
          </Sider>
    </div>
  )
}

export default SidebarAdmin
