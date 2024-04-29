import React, { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import '../../App.css';
import classNames from 'classnames/bind';
import { getListVideos } from '~/services/API/videoService';
import WatchingVideo from '~/components/VideoWatching/VideoCard';
const cx = classNames.bind(styles);

function HomePage() {
    const [videos, setVideos] = useState([]);

    const getVideos = async () => {
        const listVideos = await getListVideos();
        setVideos(listVideos);
    };

    useEffect(() => {
        getVideos();
    }, []);

    return (
        <>
            <div className={cx('home-layout')}>
                <WatchingVideo videos={videos}/>
            </div>
        </>
    );
}

export default HomePage;
