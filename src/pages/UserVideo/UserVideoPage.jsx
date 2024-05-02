import classNames from "classnames/bind"
import styles from "./UserVideo.module.scss"
import React, { useEffect, useState } from 'react';
import { getListVideosByCreatorId } from '~/services/API/videoService';
import WatchingVideo from '~/components/VideoWatching/VideoWatching';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles)
const UserVideoPage = () => {
    const [videos, setVideos] = useState([]);
    const { id } = useParams();

    

    useEffect(() => {
        const getVideos = async () => {
            const listVideos = await getListVideosByCreatorId(id);
            setVideos(listVideos);
        };

        getVideos();
    }, [id]);

    return ( videos ?
        <>
            <div className={cx('user_video-layout')}>
                <WatchingVideo videos={videos}/>
            </div>
        </> : <div>Not found</div>
    );
}

export default UserVideoPage