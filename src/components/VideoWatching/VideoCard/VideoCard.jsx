import React, { useRef, useEffect } from 'react';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';
import './VideoCard.css';

const VideoCard = (props) => {
    const {
        profilePic,
        setVideoRef,
        autoplay,
        video,
        setOpenComment,
        openComment,
    } = props;
    const videoRef = useRef(null);

    useEffect(() => {
        if (autoplay) {
            videoRef.current.play();
        }
    }, [autoplay]);

    const onVideoPress = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    };

    return (
        <>
            <div className="video">
                <video
                    className="player"
                    id={video.id}
                    onClick={onVideoPress}
                    ref={(ref) => {
                        videoRef.current = ref;
                        setVideoRef(ref);
                    }}
                    loop
                    src={video.url}
                    muted={false}
                ></video>
                <div className="bottom-controls">
                    <div className="footer-left">
                        {/* The left part of the container */}
                        <FooterLeft
                            username={video.Creator.user_name}
                            description={video.description}
                            song={video.song}
                        />
                    </div>
                    <div className="footer-right">
                        {/* The right part of the container */}
                        <FooterRight
                            profilePic={profilePic}
                            video={video}
                            setOpenComment={setOpenComment}
                            openComment={openComment}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default VideoCard;
