import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from '~/layouts';
import { Fragment, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import config from './config';
import { useDispatch, useSelector } from 'react-redux';
import { updateSocket, updateUserOnline } from './redux/socketSlice';
import { updateInformation, userCurrentClear } from './redux/userCurrentSlice';
import { getCurrentUser } from './services/API/userService';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

function App() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const currentUser = useSelector((state) => state.user_current.information);
    const userIdStorage = localStorage.getItem('userId');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const start = new Date();
            while((new Date() - start) < 3000);

            const socket = io(config.baseUrl);
            dispatch(updateSocket(socket));
            const userCurrentToken = localStorage.getItem('token');
            if (userCurrentToken) {
                const currentUser = await getCurrentUser();
                dispatch(updateInformation(currentUser));
                socket.emit('add-user', currentUser);
                dispatch(updateUserOnline(currentUser));
            } 
            setLoading(false);
        };

        fetchData();
        window.addEventListener('storage', () => {
            window.location.reload();
        });
    }, [dispatch, userIdStorage, currentUser.id]);

    return loading ? (
        <Spin
            indicator={
                <LoadingOutlined
                    style={{
                        fontSize: 24,
                    }}
                    spin
                />
            }
        />
    ) : (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Layout = DefaultLayout;
                        const Page = route.component;
                        if (route.layout) Layout = route.layout;
                        else if (route.layout === null) Layout = Fragment;
                        if (route.path === '/authentication')
                            return <Route key={index} path={route.path} element={<Page />} />;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
