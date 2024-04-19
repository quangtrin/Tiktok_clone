import classNames from 'classnames/bind';
import styles from './VideoUploaded.moudle.scss';
import CardVideo from './CardVideo';
import { Row, Col } from 'antd';

const cx = classNames.bind(styles);
const VideoUploaded = ({ videos }) => {
    return videos?.length > 0 ? (
        <div className={cx('video-uploaded-layout')}>
            <Row gutter={[16, 16]}>
                {videos.map((video) => (
                    <Col key={video.id}>
                        <CardVideo url={video.url} />
                    </Col>
                ))}
            </Row>
        </div>
    ) : (
        <div style={{ fontSize: '1.6rem', fontWeight: '600', textAlign: 'center', color: 'var(--text-tab-color)' }}>
            Haven't uploaded a video yet
        </div>
    );
};

export default VideoUploaded;
