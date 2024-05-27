import React from 'react'
import styles from "./LayoutAdmin.module.scss"
import classNames from 'classnames/bind';
import HeaderAdmin from '../components/HeaderAdmin/HeaderAdmin';
import SidebarAdmin from '../components/SidebarAdmin/SidebarAdmin';

const cx = classNames.bind(styles)

const LayoutAdmin = ({children}) => {
  return (
    <div className={cx('wrapper')}>
        <SidebarAdmin />
        <div className={cx('container')}>
            <div className={cx('content')}>{children}</div>
        </div>
    </div>
);
}

export default LayoutAdmin
