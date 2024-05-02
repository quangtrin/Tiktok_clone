import React, { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import '../../App.css';
import classNames from 'classnames/bind';
import { getListVideos } from '~/services/API/videoService';
import WatchingVideo from '~/components/VideoWatching/VideoWatching';
import { getListVideosByCreatorId } from '~/services/API/videoService';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function HomePage() {
    const [videos, setVideos] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const getVideos = async () => {
            const listVideos = id ? await getListVideosByCreatorId(id) : await getListVideos();
            setVideos(listVideos);
        };

        getVideos();
    }, [id]);

    return (
        <>
            <div className={cx('home-layout')}>
                <WatchingVideo videos={videos} />
            </div>
        </>
    );
}

export default HomePage;
