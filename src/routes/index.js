import Config from '~/config';

//Layout
import { HeaderOnly } from '~/layouts';

import HomePage from '~/pages/Home/HomePage';
import FollowingPage from '~/pages/Following/FollowingPage';
import ProfilePage from '~/pages/Profile/ProfilePage';
import UploadPage from '~/pages/Upload/UploadPage';
import SearchPage from '~/pages/Search/SearchPage';
import LivePage from '~/pages/Live';
import CreatePage from '~/pages/Create/CreateVideoPage';
import EditProfilePage from '~/pages/EditProfile/EditProfilePage';
import AuthPage from '~/pages/Login/AuthPage';
import ListFriendsPage from '~/pages/ListFriends/ListFriendsPage';
import ChatPage from '~/pages/ChatPage/ChatPage';

const publicRoutes = [
    { path: Config.routes.home, component: HomePage },
    { path: Config.routes.following, component: FollowingPage },
    { path: Config.routes.profile, component: ProfilePage },
    { path: Config.routes.userVideo, component: HomePage },
    { path: Config.routes.upload, component: UploadPage, layout: HeaderOnly },
    { path: Config.routes.search, component: SearchPage, layout: null },
    { path: Config.routes.live, component: LivePage },
    { path: Config.routes.create, component: CreatePage},
    { path: Config.routes.authentication, component: AuthPage},
    { path: Config.routes.editProfile, component: EditProfilePage },
    { path: Config.routes.notifiInfo, component: HomePage},
    { path: Config.routes.listFriends, component: ListFriendsPage},
    { path: Config.routes.chat, component: ChatPage, layout: HeaderOnly},
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
