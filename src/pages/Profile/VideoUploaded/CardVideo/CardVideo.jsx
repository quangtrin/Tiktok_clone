import classNames from 'classnames/bind';
import styles from './CardVideo.module.scss';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
const CardVideo = ({ video }) => {
    const navigation = useNavigate();
    const videoRef = useRef(null);
    const handleMouseEnter = () => {
        videoRef.current.play();
    };
    const handleMouseOut = () => {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
    };

    return (
        <div
            className={cx('card-video-profile')}
            onMouseEnter={handleMouseEnter}
            onMouseOut={handleMouseOut}
            onClick={() => (window.location.href = `/user/@${video.creator_id}/video?video=${video.id}`)}
        >
            <video
                className={cx('player')}
                loop
                ref={(ref) => {
                    videoRef.current = ref;
                }}
                src={video.url}
                muted="muted"
            />
        </div>
    );
};

export default CardVideo;
