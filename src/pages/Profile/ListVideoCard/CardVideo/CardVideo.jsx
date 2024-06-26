import classNames from 'classnames/bind';
import styles from './CardVideo.module.scss';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditIcon, RemoveIcon } from '~/components/Icons/Icons';
import { ConfirmDeleteAlertDialog, SuccessAlertDialog, ErrorAlertDialog } from '~/components/AlertDialog/AlertDialog';
import { deleteVideo } from '~/services/API/videoService';

const cx = classNames.bind(styles);
const CardVideo = ({ video, isSelf }) => {
    const navigation = useNavigate();
    const videoRef = useRef(null);
    const handleMouseEnter = () => {
        videoRef.current.play();
    };
    const handleMouseOut = () => {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        const handleOk = async () => {
            const status = await deleteVideo(video.id);
            if (status === 200) {
                SuccessAlertDialog('Deleted', 'Delete video successfully', () => {
                    navigation(0);
                });
            } else {
                ErrorAlertDialog('Delete video failed', 'Please try again later');
            }
        };
        ConfirmDeleteAlertDialog(
            'The video will not be recover',
            'Are you sure you want to delete this video?',
            handleOk,
        );
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        navigation(`/video/edit/@${video.id}`);
    };

    return (
        <div
            className={cx('card-video-profile')}
            onMouseEnter={handleMouseEnter}
            onMouseOut={handleMouseOut}
            onClick={() => (window.location.href = `/user/@${video.creator_id}/video?video=${video.id}`)}
        >
            {isSelf && (
                <div className={cx('icon-layout')}>
                    <div onClick={handleEdit}>
                        <EditIcon
                            className={cx('icon-edit')}
                            colorHover="var(--primary)"
                            backgroundColorHover="white"
                        />
                    </div>
                    <div onClick={handleDelete}>
                        <RemoveIcon
                            className={cx('icon-delete')}
                            colorHover="white"
                            backgroundColorHover="var(--primary)"
                        />
                    </div>
                </div>
            )}
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
