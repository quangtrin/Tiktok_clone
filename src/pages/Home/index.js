import React, { useEffect, useState, useRef } from 'react';
import VideoCard from '../../components/VideoCard';
import BottomNavbar from '../../components/BottomNavbar';
import TopNavbar from '../../components/TopNavbar';
import styles from './Home.module.scss';
import '../../App.css';
import axios from 'axios';
import config from '~/config';
import classNames from 'classnames/bind';
import CommentCustom from '~/components/CommentCustom';
import { Input, Avatar, Button } from 'antd';
const cx = classNames.bind(styles);

function Home() {
    const getVideos = async () => {
        const response = await axios.get(`${config.baseUrl}/api/video`);
        setVideos(response.data.videos);
    };

    const [videos, setVideos] = useState([]);
    const videoRefs = useRef([]);

    useEffect(() => {
        getVideos();
    }, []);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.8, // Adjust this value to change the scroll trigger point
        };

        // This function handles the intersection of videos
        const handleIntersection = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const videoElement = entry.target;
                    videoElement.play();
                } else {
                    const videoElement = entry.target;
                    videoElement.pause();
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, observerOptions);

        // We observe each video reference to trigger play/pause
        videoRefs.current.forEach((videoRef) => {
            observer.observe(videoRef);
        });

        // We disconnect the observer when the component is unmounted
        return () => {
            observer.disconnect();
        };
    }, [videos]);

    // This function handles the reference of each video
    const handleVideoRef = (index) => (ref) => {
        videoRefs.current[index] = ref;
    };

    return (
        <>
            <div className="container">
                <TopNavbar className="top-navbar" />
                {/* Here we map over the videos array and create VideoCard components */}
                {videos.map((video, index) => (
                    <VideoCard
                        key={index}
                        video={video}
                        profilePic={'https://variety.com/wp-content/uploads/2021/04/Avatar.jpg'}
                        setVideoRef={handleVideoRef(index)}
                        autoplay={index === 0}
                    />
                ))}
                <BottomNavbar className="bottom-navbar" />
            </div>
            <div className={cx('comment-layout')}>
                <CommentCustom>
                    <CommentCustom />
                </CommentCustom>
                <div style={{ display: 'flex' }}>
                    <div style={{ width: '20%' }}>
                        <Avatar src="https://variety.com/wp-content/uploads/2021/04/Avatar.jpg" alt="Han Solo" />
                    </div>
                    <Input />
                </div>
                <div style={{ textAlign: 'right' }}>
                    <Button type="primary" style={{ marginTop: '10px' }}>
                        Enter
                    </Button>
                </div>
            </div>
        </>
    );
}

export default Home;
