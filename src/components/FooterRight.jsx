import React, { useState } from 'react';
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
import axios from 'axios';
import baseUrl from '~/config/variableGlobal';

function FooterRight({ profilePic, video, setOpenComment, openComment, followingUsers }) {
    const userCurrentId = localStorage.getItem('userId');
    const tokenSession = localStorage.getItem('token');
    const [liked, setLiked] = useState(
        video.Likes.filter((value) => value.user_id == userCurrentId && value.video_id == video.id).length !== 0,
    );
    const [countLike, setCountLike] = useState(0);
    const [saved, setSaved] = useState(false);
    const findCreatorId = followingUsers.find((user) => {
        return Number(user.followedUser.id) === Number(video.creator_id);
    });
    const [userAddIcon, setUserAddIcon] = useState(
        findCreatorId ? faCircleCheck : video.creator_id == userCurrentId ? faCircleCheck : faCirclePlus,
    );

    const handleUserAddClick = async () => {
        try {
            await axios.post(`${baseUrl}/api/follow/${video.creator_id}`,{}, {
                headers: {
                    Authorization: `Bearer ${tokenSession}`,
                },
            });
            setUserAddIcon(faCircleCheck);
        } catch (error) {
            console.log(error);
        }
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
        try {
            await axios.post(
                `${baseUrl}/api/like`,
                { video_id: video.id },
                {
                    headers: {
                        Authorization: `Bearer ${tokenSession}`,
                    },
                },
            );
        } catch (error) {
            console.log(error);
        }
    };
    const unLikeAction = async () => {
        try {
            await axios.delete(`${baseUrl}/api/like`, {
                headers: {
                    Authorization: `Bearer ${tokenSession}`,
                },
                data: { video_id: video.id },
            });
        } catch (error) {
            console.log(error);
        }
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

    return (
        <div className="footer-right">
            <div className="sidebar-icon">
                {profilePic ? (
                    // Displaying the user profile picture
                    <img
                        src={profilePic}
                        className="userprofile"
                        alt="Profile"
                        style={{ width: '45px', height: '45px', color: '#616161' }}
                    />
                ) : null}
                <FontAwesomeIcon
                    icon={userAddIcon}
                    className="useradd"
                    style={{ width: '15px', height: '15px', color: '#FF0000' }}
                    onClick={userAddIcon === faCirclePlus ? handleUserAddClick : null}
                />
            </div>
            <div className="sidebar-icon">
                {/* The heart icon for liking */}
                <FontAwesomeIcon
                    icon={faHeart}
                    style={{ width: '35px', height: '35px', color: liked ? '#FF0000' : 'white' }}
                    onClick={handleLikeClick}
                />
                {/* Displaying the formatted likes count */}
                <p>{formatLikesCount(parseLikesCount(video.Likes.length) + countLike)}</p>
            </div>
            <div className="sidebar-icon">
                {/* The comment icon */}
                <FontAwesomeIcon
                    icon={faCommentDots}
                    style={{ width: '35px', height: '35px', color: 'white' }}
                    onClick={handleCommentIconClick}
                />
                {/* Displaying the number of comments */}
                <p>{video.Comments.length}</p>
            </div>
            <div className="sidebar-icon">
                {saved ? (
                    // Displaying the bookmark icon when saved
                    <FontAwesomeIcon
                        icon={faBookmark}
                        style={{ width: '35px', height: '35px', color: '#ffc107' }}
                        onClick={() => setSaved(false)}
                    />
                ) : (
                    // Displaying the bookmark icon when not saved
                    <FontAwesomeIcon
                        icon={faBookmark}
                        style={{ width: '35px', height: '35px', color: 'white' }}
                        onClick={() => setSaved(true)}
                    />
                )}
                {/* Displaying the number of saves */}
                <p>{saved ? 23 + 1 : 23}</p>
            </div>
            <div className="sidebar-icon">
                {/* The share icon */}
                <FontAwesomeIcon icon={faShare} style={{ width: '35px', height: '35px', color: 'white' }} />
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
