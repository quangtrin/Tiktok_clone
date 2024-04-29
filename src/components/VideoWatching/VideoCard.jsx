import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postComments } from '~/services/API/commentService';
import { addComment, updateListCommentCurrent } from '~/redux/commentSlice';
import TopNavbar from './VideoCard/TopNavbar';
import VideoCard from './VideoCard/VideoCard';
import BottomNavbar from './VideoCard/BottomNavbar';
import classNames from 'classnames/bind';
import { Avatar, Input, Button } from 'antd';
import CommentCustom from '../CommentCustom/CommentCustom';
import styles from "./WatchingVideo.module.scss"

const cx = classNames.bind(styles)
const WatchingVideo = ({videos}) => {
    const dispatch = useDispatch();
    const [videoCurrent, setVideoCurrent] = useState();
    const [openComment, setOpenComment] = useState(false);
    const [content, setContent] = useState();
    const [followingUsers, setFollowingUsers] = useState([]);

    const listCommentCurrent = useSelector((state) => state.comment.listCommentCurrent);
    const currentUser = useSelector((state) => state.user_current.information);
    const videoRefs = useRef([]);

    const handleOnChangeComment = (event) => {
        setContent(event.target.value);
    };

    const handleSubmitComment = async () => {
        if (videoCurrent && content && content !== '') {
            try {
                const newComment = await postComments(videoCurrent.id, content);
                dispatch(addComment(newComment));
                setContent('');
            } catch (error) {}
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
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const videoElement = entry.target;
                    const video = videos.filter((video) => video.id == videoElement.id)[0];
                    setVideoCurrent(video);
                    dispatch(updateListCommentCurrent(video.Comments));
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
                        profilePic={video.Creator.avatar}
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
                <div style={{ display: 'flex', marginBottom: '1rem' }}>
                    <div style={{ width: '15%' }}>
                        <Avatar src={currentUser.avatar} alt="Han Solo" />
                    </div>
                    <Input onChange={handleOnChangeComment} value={content} onPressEnter={handleSubmitComment} />
                    <div style={{ textAlign: 'right' }}>
                        <Button type="primary" onClick={handleSubmitComment} style={{ marginLeft: '1rem' }}>
                            Enter
                        </Button>
                    </div>
                </div>
                <div className={cx('content')}>
                    {listCommentCurrent?.map((comment, index) => {
                        if (!comment.comment_parent_id)
                            return (
                                <CommentCustom
                                    key={index}
                                    comment={comment}
                                    children={comment.comment_child?.map((child) => (
                                        <CommentCustom key={child.id} comment={child} />
                                    ))}
                                />
                            );
                    })}
                </div>
            </div>
        </>
    );
};

export default WatchingVideo
