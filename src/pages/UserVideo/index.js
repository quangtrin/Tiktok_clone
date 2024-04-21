import classNames from "classnames/bind"
import styles from "./UserVideo.module.scss"
import React, { useEffect, useState } from 'react';
import { getListVideos, getListVideosByCreatorId } from '~/services/API/videoService';
import WatchingVideo from '~/components/VideoWatching';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles)
const UserVideo = () => {
    const [videos, setVideos] = useState([]);
    const { id, videoId } = useParams();

    const getVideos = async () => {
        const listVideos = await getListVideosByCreatorId(id);
        console.log(listVideos);
        setVideos(listVideos);
    };

    useEffect(() => {
        getVideos();
    }, []);

    return ( videos ?
        <>
            <div className={cx('user_video-layout')}>
                <WatchingVideo videos={videos}/>
            </div>
        </> : <div>Not found</div>
    );
}

export default UserVideo