import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getCommentsByVideoId } from '~/services/API/commentService';
import { updateListCommentCurrent } from '~/redux/commentSlice';
import TopNavbar from './VideoCard/TopNavbar';
import VideoCard from './VideoCard/VideoCard';
import BottomNavbar from './VideoCard/BottomNavbar';
import classNames from 'classnames/bind';
import styles from './WatchingVideo.module.scss';
import { updateVideoCurrentId } from '~/redux/videoCurrentSlice';
import CommentSidebar from './CommentSidebar/CommentSidebar';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);
const WatchingVideo = ({ videos }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const { videoId, commentId } = { videoId: queryParams.get('video'), commentId: queryParams.get('comment') };
    const [openComment, setOpenComment] = useState(commentId ? true : false);

    const videoRefs = useRef([]);

    // This function handles the reference of each video
    const handleVideoRef = (index) => (ref) => {
        videoRefs.current[index] = ref;
        if (videos[index].id?.toString() === videoId?.toString()) {
            ref?.scrollIntoView();
        }
    };

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.8, // Adjust this value to change the scroll trigger point
        };

        // This function handles the intersection of videos
        const handleIntersection = (entries) => {
            entries.forEach(async (entry) => {
                if (entry.isIntersecting) {
                    const videoElement = entry.target;
                    const video = videos.filter((video) => video.id?.toString() === videoElement.id?.toString())[0];
                    dispatch(updateVideoCurrentId(video.id));
                    const commentsVideo = await getCommentsByVideoId(video.id);
                    dispatch(updateListCommentCurrent(commentsVideo));
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
    }, [videos, dispatch]);

    return (
        <>
            <div className={cx('layout')}>
                <TopNavbar className="top-navbar" />
                {videos?.map((video, index) => (
                    <VideoCard
                        key={index}
                        video={video}
                        profilePic={video.Creator.avatar}
                        setVideoRef={handleVideoRef(index)}
                        autoplay={index === 0}
                        setOpenComment={setOpenComment}
                        openComment={openComment}
                    />
                ))}
                <BottomNavbar className="bottom-navbar" />
            </div>
            <CommentSidebar openComment={openComment} setOpenComment={setOpenComment}/>
        </>
    );
};

export default WatchingVideo;
