import classNames from 'classnames/bind';
import styles from './CardVideo.module.scss';
import { useRef } from 'react';

const cx = classNames.bind(styles);
const CardVideo = ({url}) => {
    const videoRef = useRef(null);
    const handleMouseEnter = () => {
        videoRef.current.play()
    }
    const handleMouseOut = () => {
        videoRef.current.pause();
        videoRef.current.currentTime = 0
    }

    return (
        <div
            className={cx('card-video-profile')}
            onMouseEnter={handleMouseEnter}
            onMouseOut={handleMouseOut}
        >
            <video
                className={cx('player')}
                loop
                ref={(ref) => {
                    videoRef.current = ref;
                }}
                src={url}
                muted="muted"
            />
        </div>
    );
};

export default CardVideo;
