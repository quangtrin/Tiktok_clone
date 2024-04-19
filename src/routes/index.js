import Config from '~/config';

//Layout
import { HeaderOnly } from '~/layouts';

import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import Live from '~/pages/Live';
import Create from '~/pages/Create';
import AuthenticationForm from '~/pages/Login';
import UserVideo from '~/pages/UserVideo';
import EditProfile from '~/pages/EditProfile';

const publicRoutes = [
    { path: Config.routes.home, component: Home },
    { path: Config.routes.following, component: Following },
    { path: Config.routes.profile, component: Profile },
    { path: Config.routes.userVideo, component: UserVideo },
    { path: Config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: Config.routes.search, component: Search, layout: null },
    { path: Config.routes.live, component: Live},
    { path: Config.routes.create, component: Create},
    { path: Config.routes.authentication, component: AuthenticationForm},
    { path: Config.routes.editProfile, component: EditProfile}
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
