import classNames from 'classnames/bind';
import config from '~/config';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import {
    HomeIcon,
    HomeActiveIcon,
    UserGroupActiveIcon,
    UserGroupIcon,
    LiveActiveIcon,
    LiveIcon,
    FollowingUserIcon,
    FollowingUserActiveIcon,
} from '~/components/Icons/Icons';
import SuggestedAccounts from '../SuggestedAccounts/SuggestedAccounts';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Sidebar() {
    const currentUser = useSelector((state) => state.user_current.information);
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem
                    title="For Your"
                    to={config.routes.home}
                    icon={<HomeIcon />}
                    activeIcon={<HomeActiveIcon />}
                ></MenuItem>
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<FollowingUserIcon />}
                    activeIcon={<FollowingUserActiveIcon />}
                ></MenuItem>
                <MenuItem
                    title="Friends"
                    to={config.routes.listFriends}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                ></MenuItem>
                {/* <MenuItem
                    title="LIVE"
                    to={config.routes.live}
                    icon={<LiveIcon />}
                    activeIcon={<LiveActiveIcon />}
                ></MenuItem> */}
            </Menu>

            {currentUser.id ? <SuggestedAccounts label="Following accounts" /> : null}
        </aside>
    );
}

export default Sidebar;
