import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCirclePlus,
    faCircleCheck,
    faHeart,
    faCommentDots,
    faBookmark,
    faShare,
} from '@fortawesome/free-solid-svg-icons';
import './FooterRight.css';
import { follow } from '~/services/API/followService';
import { like, unLike } from '~/services/API/likeService';
import { addFollow } from '~/redux/userCurrentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'antd';
import { SuccessAlertDialog } from '~/components/AlertDialog/AlertDialog';

function FooterRight({ profilePic, video, setOpenComment, openComment }) {
    const userCurrentId = localStorage.getItem('userId');
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const listFollowingUser = useSelector((state) => state.user_current.listFollowingUser);
    const listCommentCurrent = useSelector((state) => state.comment.listCommentCurrent);
    const socket = useSelector((state) => state.socket.socket);
    const currentUser = useSelector((state) => state.user_current.information);
    const [liked, setLiked] = useState(
        video.Likes.filter(
            (value) =>
                value.user_id?.toString() === currentUser.id?.toString() &&
                value.video_id?.toString() === video.id?.toString(),
        ).length !== 0,
    );
    const [countLike, setCountLike] = useState(0);
    const [saved, setSaved] = useState(false);

    const [userAddIcon, setUserAddIcon] = useState(faCircleCheck);

    const handleUserAddClick = async () => {
        const status = await follow(video.creator_id, socket);
        if (status === 201) {
            SuccessAlertDialog('The two of you followed each other and became friends', '');
        }
        dispatch(addFollow(video.Creator));
        setUserAddIcon(faCircleCheck);
    };

    // Function to convert likes count to a number
    const parseLikesCount = (count) => {
        if (typeof count === 'string') {
            if (count.endsWith('K')) {
                return parseFloat(count) * 1000;
            }
            return parseInt(count);
        }
        return count;
    };

    // Function to format likes count
    const formatLikesCount = (count) => {
        if (count >= 10000) {
            return (count / 1000).toFixed(1) + 'K';
        }
        return count;
    };
    const likeAction = async () => {
        await like(video.id, socket);
    };
    const unLikeAction = async () => {
        unLike(video.id);
    };
    // NEED REFACTER
    const handleLikeClick = async () => {
        const isLikedBefore =
            video.Likes.filter((value) => value.user_id == userCurrentId && value.video_id == video.id).length !== 0;
        if (isLikedBefore && liked) setCountLike(-1);
        else if (isLikedBefore && !liked) setCountLike(0);
        else if (!liked) setCountLike(1);
        else setCountLike(0);
        (await liked) ? unLikeAction() : likeAction();
        setLiked((prevLiked) => !prevLiked);
    };

    const handleCommentIconClick = () => {
        setOpenComment(!openComment);
    };

    useEffect(() => {
        const findCreatorId = listFollowingUser.find((user) => {
            return user.id?.toString() === video.creator_id.toString();
        });
        setUserAddIcon(
            findCreatorId
                ? faCircleCheck
                : video.creator_id?.toString() === currentUser.id?.toString()
                ? faCircleCheck
                : faCirclePlus,
        );
    }, [listFollowingUser, currentUser.id, video.creator_id]);

    return (
        <div className="footer-right">
            <div className="sidebar-icon">
                {profilePic ? (
                    // Displaying the user profile picture
                    // <img
                    //     onClick={() => {
                    //         navigation(`/user/@${video.creator_id}`);
                    //     }}
                    //     src={profilePic}
                    //     className="userprofile"
                    //     alt="Profile"
                    //     style={{ width: '4.5rem', height: '4.5rem', color: '#616161' }}
                    // />
                    <Avatar
                        onClick={() => {
                            navigation(`/user/@${video.creator_id}`);
                        }}
                        alt="Profile"
                        src={profilePic}
                        className="userprofile"
                        style={{ width: '4.5rem', height: '4.5rem', color: '#616161' }}
                    />
                ) : null}
                <FontAwesomeIcon
                    icon={userAddIcon}
                    className="useradd"
                    style={{ width: '1.5rem', height: '1.5rem', color: '#FF0000' }}
                    onClick={userAddIcon === faCirclePlus ? handleUserAddClick : null}
                />
            </div>
            <div className="sidebar-icon">
                {/* The heart icon for liking */}
                <FontAwesomeIcon
                    icon={faHeart}
                    style={{ width: '3.5rem', height: '3.5rem', color: liked ? '#FF0000' : 'white' }}
                    onClick={handleLikeClick}
                />
                {/* Displaying the formatted likes count */}
                <p>{formatLikesCount(parseLikesCount(video.Likes.length) + countLike)}</p>
            </div>
            <div className="sidebar-icon">
                {/* The comment icon */}
                <FontAwesomeIcon
                    icon={faCommentDots}
                    style={{ width: '3.5rem', height: '3.5rem', color: 'white' }}
                    onClick={handleCommentIconClick}
                />
                {/* Displaying the number of comments */}
                <p>{listCommentCurrent.length}</p>
            </div>
            <div className="sidebar-icon">
                {saved ? (
                    // Displaying the bookmark icon when saved
                    <FontAwesomeIcon
                        icon={faBookmark}
                        style={{ width: '3.5rem', height: '3.5rem', color: '#ffc107' }}
                        onClick={() => setSaved(false)}
                    />
                ) : (
                    // Displaying the bookmark icon when not saved
                    <FontAwesomeIcon
                        icon={faBookmark}
                        style={{ width: '3.5rem', height: '3.5rem', color: 'white' }}
                        onClick={() => setSaved(true)}
                    />
                )}
                {/* Displaying the number of saves */}
                <p>{saved ? 23 + 1 : 23}</p>
            </div>
            <div className="sidebar-icon">
                {/* The share icon */}
                <FontAwesomeIcon icon={faShare} style={{ width: '3.5rem', height: '3.5rem', color: 'white' }} />
                {/* Displaying the number of shares */}
                <p>{2}</p>
            </div>
            <div className="sidebar-icon record">
                {/* Displaying the record icon */}
                <img src="https://static.thenounproject.com/png/934821-200.png" alt="Record Icon" />
            </div>
        </div>
    );
}

export default FooterRight;
