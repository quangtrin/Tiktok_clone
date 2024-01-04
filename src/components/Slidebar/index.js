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
} from '~/components/Icons';
import SuggestedAccounts from '../SuggestedAccounts/SuggestedAccounts';

const cx = classNames.bind(styles);

function Sidebar() {
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
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                ></MenuItem>
                <MenuItem
                    title="LIVE"
                    to={config.routes.live}
                    icon={<LiveIcon />}
                    activeIcon={<LiveActiveIcon />}
                ></MenuItem>
            </Menu>

            {/* <SuggestedAccounts label="Suggested accounts" /> */}
            <SuggestedAccounts label="Following accounts" />
        </aside>
    );
}

export default Sidebar;
