import {
    faCircleQuestion,
    faCoins,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';

import images from '~/assets/images';
import Button from '~/components/Button/Button';
import { InboxIcon, MessageIcon, UploadIcon } from '~/components/Icons/Icons';
import Image from '~/components/Image/Image';
import Menu from '~/components/Propper/Menu/Menu';
import styles from './Header.module.scss';
import Search from '../Search/Search';
import config from '~/config';
import { useSelector, useDispatch } from 'react-redux';
import { getUserById } from '~/services/API/userService';
import { useEffect, useState } from 'react';
import { Popover } from 'antd';
import NotificationPopup from '../NotificationPopup/NotificationPopup';
import { getNotificationUser } from '~/services/API/notificationService';

const cx = classNames.bind(styles);
const MENU_ITEM = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and Help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    const currentUser = useSelector((state) => state.user_current.information);
    const socket = useSelector((state) => state.socket.socket);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                break;

            default:
                break;
        }
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: `/user/@${currentUser.id}`,
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            to: '/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEM,
        {
            icon: (
                <FontAwesomeIcon
                    icon={faSignOut}
                />
            ),
            title: 'Log out',
            to: '/authentication',
            separate: true,
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if (currentUser.id) {
                const notifications = await getNotificationUser();
                setNotifications(notifications);
            }
            setLoading(false);
        };

        fetchData();

    }, [currentUser.id]);

    useEffect(() => {
        const handleSocket = async () => {
            await socket.on('send-notification', async (data) => {
                const sender = await getUserById(data.notification.sender_id);
                const newNotifi = {
                    ...data.notification,
                    sender,
                };
                setNotifications((prev) => [newNotifi, ...prev]);
            });
        };

        if (socket) handleSocket();
    }, [socket]);

    return (
        !loading && (
            <header className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('logo')}>
                        <Link to={config.routes.home} className={cx('logo-link')}>
                            <img src={images.logo} alt="Tiktok" />
                        </Link>
                    </div>

                    <Search />

                    <div className={cx('actions')}>
                        {currentUser.id ? (
                            <>
                                <Tippy delay={[0, 50]} content="Upload video" placement="bottom">
                                    <button className={cx('action-btn')}>
                                        <UploadIcon />
                                    </button>
                                </Tippy>
                                <Tippy delay={[0, 50]} content="Message" placement="bottom">
                                    <button className={cx('action-btn')}>
                                        <MessageIcon />
                                    </button>
                                </Tippy>
                                <Popover
                                    content={<NotificationPopup notifications={notifications} />}
                                    trigger={'click'}
                                >
                                    <button className={cx('action-btn')}>
                                        <InboxIcon />
                                        <span className={cx('badge')}>
                                            {notifications.filter((notifi) => !notifi.read).length}
                                        </span>
                                    </button>
                                </Popover>
                            </>
                        ) : (
                            <>
                                <Button text>Upload</Button>
                                <Button primary to={'/authentication'}>
                                    Log In
                                </Button>
                            </>
                        )}
                        <Menu items={currentUser.id ? userMenu : MENU_ITEM} onChange={handleMenuChange}>
                            {currentUser.id ? (
                                <Image
                                    className={cx('user-avatar')}
                                    src={currentUser.avatar}
                                    alt={currentUser.user_name}
                                    fallback=""
                                />
                            ) : (
                                <button className={cx('more-btn')}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </button>
                            )}
                        </Menu>
                    </div>
                </div>
            </header>
        )
    );
}

export default Header;
