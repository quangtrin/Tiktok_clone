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

const VideoPlayer = ({ url }) => {
    return (
        <AbsoluteFill>
            <Video src={url} height={'100%'} width={'100%'} style={{ objectFit: 'fill' }} />
        </AbsoluteFill>
    );
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
        if (form.validateFields().errorFields?.length > 0) return;
        id ? handleUpdateVideoForm(values) : handleCreateVideoForm(values);
    };

    const handleVideoChange = async (value) => {
        if (!value.file.originFileObj.type.includes('video')) {
            return;
        }
        setVideoUrl(await URL.createObjectURL(value.file.originFileObj));
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
            console.log(video);
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
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    const lastFile = value[value.length - 1];
                                    if (lastFile && lastFile.type.split('/')[0] !== 'video') {
                                        return Promise.reject(new Error('Please choose video file!'));
                                    }
                                    return Promise.resolve();
                                },
                            }),
                        ]}
                    >
                        <Upload.Dragger
                            disabled={id}
                            name="files"
                            onChange={handleVideoChange}
                            showUploadList={false}
                            multiple={false}
                            style={
                                videoUrl && {
                                    width: 'calc(var(--width-container-video)*0.7)',
                                    height: 'calc(var(--heigth-container-video)*0.7)',
                                    overflow: 'hidden',
                                }
                            }
                        >
                            {videoUrl ? (
                                // <video
                                //     height="100%"
                                //     width="100%"
                                //     loop
                                //     style={{ objectFit: 'fill' }}
                                //     src={videoUrl}
                                //     muted={false}
                                //     autoPlay
                                //     controls
                                // ></video>
                                <Player
                                    component={VideoPlayer}
                                    durationInFrames={600}
                                    compositionWidth={widthPlayer}
                                    compositionHeight={heightPlayer}
                                    fps={60}
                                    controls
                                    autoPlay
                                    loop
                                    inputProps={{ url: videoUrl }}
                                />
                            ) : (
                                <div>
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">Click or drag video to this area to upload</p>
                                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                                </div>
                            )}
                        </Upload.Dragger>
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
