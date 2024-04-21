import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from '~/layouts';
import { Fragment, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import config from './config';
import { useDispatch, useSelector } from 'react-redux';
import { updateSocket, updateUserOnline } from './redux/socketSlice';

function App() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user_current.information);
    useEffect(() => {
        const socket = io(config.baseUrl);
        dispatch(updateSocket(socket));
        if (currentUser.id) {
            socket.emit("add-user", currentUser);
            dispatch(updateUserOnline(currentUser));
        }
    }, []);
    return (
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
