import classNames from 'classnames/bind';
import styles from './ListVideoCard.moudle.scss';
import CardVideo from './CardVideo/CardVideo';
import { Row, Col } from 'antd';

const cx = classNames.bind(styles);
const VideoUploaded = ({ videos, isSelf }) => {
    return videos?.length > 0 ? (
        <div className={cx('video-uploaded-layout')}>
            <Row gutter={[16, 16]}>
                {videos.map((video) => (
                    <Col key={video.id}>
                        <CardVideo video={video} isSelf={isSelf}/>
                    </Col>
                ))}
            </Row>
        </div>
    ) : (
        <div style={{ fontSize: '1.6rem', fontWeight: '600', textAlign: 'center', color: 'var(--text-tab-color)' }}>
            Do not have any videos
        </div>
    );
};

export default VideoUploaded;
