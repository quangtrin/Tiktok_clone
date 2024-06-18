import classNames from 'classnames/bind';
import styles from './ModalContent.module.scss';
import './ModalContentLibrary.scss';
const cx = classNames.bind(styles);

const ModalContent = ({ video }) => {
    return (
        <>
            <div className={cx('video')}>
                <video
                    className={cx('player')}
                    id={1}
                    autoPlay
                    loop
                    controls
                    src={video.url}
                    muted={false}
                ></video>
            </div>
        </>
    );
};
export default ModalContent;
