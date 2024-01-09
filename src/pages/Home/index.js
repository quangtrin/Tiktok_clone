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
    const tokenSession = localStorage.getItem('token');
    const [videos, setVideos] = useState([]);
    const [videoCurrent, setVideoCurrent] = useState();
    const [openComment, setOpenComment] = useState(false);
    const [commentCurrentVideo, setCommnetCurrentVideo] = useState([]);
    const [content, setContent] = useState();
    const [followingUsers, setFollowingUsers] = useState([]);
    const videoRefs = useRef([]);
    const textInput = useRef();

    const getVideos = async () => {
        const response = await axios.get(`${config.baseUrl}/api/video`);
        setVideos(response.data.videos);
    };

    const getDataFollowingUser = async () => {
        try {
            const res = await axios.get(`${config.baseUrl}/api/follow/followed`, {
                headers: {
                    Authorization: `Bearer ${tokenSession}`,
                },
            });
            setFollowingUsers(res.data.followedUsers);
        } catch (error) {
            console.log(error);
        }
    };

    const handleOnChangeComment = (event) => {
        setContent(event.target.value);
    };

    const handleSubmitComment = async () => {
        if (videoCurrent && content && content !== '') {
            try {
                const response = await axios.post(
                    `${config.baseUrl}/api/comment`,
                    {
                        videoId: videoCurrent.id,
                        content,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${tokenSession}`,
                        },
                    },
                );
                const newComment = [response.data.newComment, ...videoCurrent.Comments];
                videoCurrent.Comments.splice(0, 0, response.data.newComment);
                setCommnetCurrentVideo(newComment);
                setContent('');
            } catch (error) {}
        }
    };

    useEffect(() => {
        getVideos();
    }, []);
    useEffect(() => {
        getDataFollowingUser();
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
                    const video = videos.filter((video) => video.id == videoElement.id)[0];
                    setVideoCurrent(video);
                    setCommnetCurrentVideo(video.Comments);
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
                {videos.map((video, index) => (
                    <VideoCard
                        key={index}
                        video={video}
                        profilePic={'https://variety.com/wp-content/uploads/2021/04/Avatar.jpg'}
                        setVideoRef={handleVideoRef(index)}
                        autoplay={index === 0}
                        setOpenComment={setOpenComment}
                        openComment={openComment}
                        followingUsers={followingUsers}
                    />
                ))}
                <BottomNavbar className="bottom-navbar" />
            </div>
            <div className={cx('comment-layout')} style={!openComment ? { display: 'none' } : {}}>
                <div style={{ display: 'flex', marginBottom: '10px' }}>
                    <div style={{ width: '15%' }}>
                        <Avatar src="https://variety.com/wp-content/uploads/2021/04/Avatar.jpg" alt="Han Solo" />
                    </div>
                    <Input onChange={handleOnChangeComment} value={content} onPressEnter={handleSubmitComment}/>
                    <div style={{ textAlign: 'right' }}>
                        <Button type="primary" onClick={handleSubmitComment} style={{ marginLeft: '10px' }}>
                            Enter
                        </Button>
                    </div>
                </div>
                <div className={cx('content')}>
                    {commentCurrentVideo?.map((comment, index) => {
                        return <CommentCustom key={index} comment={comment} />;
                    })}
                </div>
            </div>
        </>
    );
}

export default Home;
