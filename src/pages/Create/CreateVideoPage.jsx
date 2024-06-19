import { InboxOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Form, Input, Space, Upload } from 'antd';
import Swal from 'sweetalert2';
import { createVideo, getVideoById, updateVideo } from '~/services/API/videoService';
import { useNavigate, useParams } from 'react-router-dom';
import './CreateVideoLibrary.scss';
import Button from '~/components/Button/Button';
import Hashtag from '~/components/Hashtag/Hashtag';
import { useSelector } from 'react-redux';
import { Player } from '@remotion/player';
import { AbsoluteFill, Video } from 'remotion';
import { vhStringToPixel } from '~/utils/function';
import { Timeline } from '@xzdarcy/react-timeline-editor';
import { RemoveIcon } from '~/components/Icons/Icons';
import styles from './CreateVideoPage.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const VideoPlayer = ({ url, setVideoUrl, setMockData }) => {
    const handleClearVideo = () => {
        setVideoUrl('');
        setMockData([
            {
                id: 0,
                actions: [
                    {
                        id: 'action0',
                        start: 0,
                        end: 0,
                        maxEnd: 180,
                        effectId: 'effects0',
                    },
                ],
            },
        ]);
    };
    return (
        <div>
            <div style={{ position: 'absolute', zIndex: 1, top: 0, right: 0 }} onClick={handleClearVideo}>
                <RemoveIcon className={cx('icon-delete')} colorHover="white" backgroundColorHover="var(--primary)" />
            </div>
            <AbsoluteFill>
                <Video src={url} height={'100%'} width={'100%'} style={{ objectFit: 'fill' }} />
            </AbsoluteFill>
        </div>
    );
};

const CustomScale = ({ scale }) => {
    const min = parseInt(scale / 60 + '');
    const second = ((scale % 60) + '').padStart(2, '0');
    return <>{`${min}:${second}`}</>;
};

function CreateVideoPage() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const socket = useSelector((state) => state.socket.socket);
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const [heightPlayer, setHeightPlayer] = useState(300);
    const [widthPlayer, setWidthPlayer] = useState(575);
    const [duration, setDuration] = useState(54000); // duration = 15p
    const [mockData, setMockData] = useState([
        {
            id: 0,
            actions: [
                {
                    id: 'action0',
                    start: 0,
                    end: 0,
                    maxEnd: 180,
                    effectId: 'effects0',
                },
            ],
        },
    ]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(0);
    const [mockEffect, setMockEffect] = useState({
        effects0: {
            id: 'effects0',
            name: 'effects0',
        },
    });
    const { id } = useParams();

    const handleCreateVideoForm = async (values) => {
        setLoading(true);
        const tagsString = tags.join(' ');
        const status = await createVideo(
            values.video.pop().originFileObj,
            values.description,
            tagsString,
            'default',
            socket,
        );
        if (status === 200) {
            Swal.fire({
                title: 'Upload successfully!',
                text: 'Upload successfully!',
                icon: 'success',
            }).then((result) => {
                if (result.isConfirmed) {
                    id ? navigate(-1) : navigate('/');
                }
            });
        }
        setLoading(false);
    };

    const handleUpdateVideoForm = async (values) => {
        setLoading(true);
        const tagsString = tags.join(' ');
        const status = await updateVideo(id, values.description, tagsString, 'default');
        if (status === 200) {
            Swal.fire({
                title: 'Update successfully!',
                text: 'Update successfully!',
                icon: 'success',
            }).then((result) => {
                if (result.isConfirmed) {
                    id ? navigate(-1) : navigate('/');
                }
            });
        }
        setLoading(false);
    };
    const onFinish = async (values) => {
        id ? handleUpdateVideoForm(values) : handleCreateVideoForm(values);
    };

    const handleVideoChange = async (value) => {
        const newUrlVideo = await URL.createObjectURL(value.file.originFileObj);
        const newVideo = document.createElement('video');
        newVideo.src = newUrlVideo;
        newVideo.onloadedmetadata = () => {
            const duration = newVideo.duration;
            setVideoUrl(newUrlVideo);
            setDuration(duration + 1);
            const maxEnd = duration < 180 ? duration : 180;
            setMockData((prev) => [
                { ...prev[0], actions: [{ ...prev[0].actions[0], end: duration, maxEnd: maxEnd }] },
            ]);
        };
    };

    const handleTimelineChange = (editorData) => {
        const maxEnd =
            editorData[0].actions[0].start + 180 > duration ? duration - 1 : editorData[0].actions[0].start + 180;
        setMockData([
            {
                ...editorData[0],
                actions: [{ ...editorData[0].actions[0], maxEnd: maxEnd }],
            },
        ]);
    };

    useEffect(() => {
        const fetchVideo = async () => {
            const video = await getVideoById(id);
            if (!video) {
                return;
            }
            setVideoUrl(video.url);
            setTags(video.hashtag.split(' '));
            form.setFieldsValue({
                description: video.description,
            });
        };
        if (id) {
            fetchVideo();
        }
    }, [id, form]);

    useEffect(() => {
        const containerHeightVh = getComputedStyle(document.documentElement).getPropertyValue(
            '--heigth-container-video',
        );
        const containerHeight = vhStringToPixel(containerHeightVh) * 0.7;
        setHeightPlayer(parseInt(containerHeight));
        setWidthPlayer(parseInt(containerHeight * 0.55));
    }, []);
    return (
        <div id="Create-video">
            <Form
                form={form}
                name="validate_other"
                {...formItemLayout}
                onFinish={onFinish}
                onSubmit={(e) => {
                    e.preventDefault();
                }}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                initialValues={{
                    'input-number': 3,
                    'checkbox-group': ['A', 'B'],
                    rate: 3.5,
                    'color-picker': null,
                }}
                style={{
                    maxWidth: '600rem',
                    margin: 'auto',
                }}
            >
                <Form.Item label="Dragger">
                    <Form.Item
                        name="video"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        noStyle
                        rules={[
                            {
                                required: !id,
                                message: 'Please choose your video!',
                            },
                        ]}
                    >
                        {!videoUrl ? (
                            <Upload.Dragger
                                disabled={id}
                                name="files"
                                onChange={handleVideoChange}
                                showUploadList={false}
                                multiple={false}
                                customRequest={({ onSuccess }) => {
                                    onSuccess('ok', null);
                                }}
                                style={
                                    videoUrl && {
                                        width: 'calc(var(--width-container-video)*0.7)',
                                        height: 'calc(var(--heigth-container-video)*0.7)',
                                        overflow: 'hidden',
                                        display: 'none',
                                    }
                                }
                            >
                                <div>
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">Click or drag video to this area to upload</p>
                                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                                </div>
                            </Upload.Dragger>
                        ) : (
                            <div>
                                <Player
                                    component={VideoPlayer}
                                    durationInFrames={parseInt(duration * 60)}
                                    inFrame={parseInt(mockData[0].actions[0].start * 60)}
                                    outFrame={parseInt(mockData[0].actions[0].end * 60)}
                                    compositionWidth={widthPlayer}
                                    compositionHeight={heightPlayer}
                                    fps={60}
                                    controls
                                    autoPlay
                                    loop
                                    style={{ borderRadius: '0.5rem', margin: 'auto' }}
                                    inputProps={{ url: videoUrl, setVideoUrl, setMockData }}
                                />
                                <Timeline
                                    onChange={handleTimelineChange}
                                    onCursorDrag={(time) => console.log(time)}
                                    editorData={mockData}
                                    effects={mockEffect}
                                    autoScroll={false}
                                    dragLine={true}
                                    getActionRender={(action, row) => {
                                        return <div>Max 180s</div>;
                                    }}
                                    getScaleRender={(scale) => <CustomScale scale={scale} />}
                                    scale={parseInt(duration / 12)}
                                    scaleWidth={40}
                                    rowHeight={50}
                                    hideCursor
                                    style={{ height: '10rem', width: '100%', marginTop: '0.5rem' }}
                                />
                            </div>
                        )}
                    </Form.Item>
                </Form.Item>
                <Form.Item label="Description" name="description">
                    <Input />
                </Form.Item>
                <Form.Item label="Hashtag" name="hashtag">
                    <Hashtag tags={tags} setTags={setTags} />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 10,
                        span: 8,
                    }}
                    style={{
                        textAlign: 'end',
                    }}
                >
                    <Space align={'end'}>
                        <Button primary htmlType="submit" loading={loading}>
                            Submit
                        </Button>
                        <Button outline htmlType="reset" disabled={loading}>
                            reset
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
}
export default CreateVideoPage;
