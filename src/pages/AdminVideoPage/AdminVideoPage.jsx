import classNames from 'classnames/bind';
import styles from './AdminVideoPage.module.scss';
import { Form, Input, Button, DatePicker, Table, Modal, Tooltip } from 'antd';
import { IoPlayCircle } from 'react-icons/io5';
import './AdminVideoPageLibrary.scss';
import { useEffect, useState } from 'react';
import { deleteVideo, getListVideos } from '~/services/API/videoService';
import { LoadingIcon } from '~/components/Icons/Icons';
import { dayjsToDateTime, formatDateTime } from '~/utils/function';
import ModalContent from './ModalContent/ModalContent';
import { ConfirmDeleteAlertDialog } from '~/components/AlertDialog/AlertDialog';
import { MessageSuccess } from '~/components/Message/Message';

const cx = classNames.bind(styles);

const AdminVideoPage = () => {
    const [openModal, setOpenModal] = useState(false);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [videoCurrentFocus, setVideoCurrentFocus] = useState('');
    const [nameFilter, setNameFilter] = useState('');
    const [idFilter, setIdFilter] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const filterVideos = (videos, nameFilter, idFilter, startDate, endDate) => {
        return videos.filter((video) => {
            const nameMatch =
                nameFilter && nameFilter !== ''
                    ? video.Creator.user_name.toLowerCase().includes(nameFilter.toLowerCase())
                    : true;
            const idMatch = idFilter && idFilter !== '' ? video.id.toString() === idFilter : true;
            const dateMatch =
                startDate && endDate
                    ? new Date(video.createdAt) >= new Date(startDate) && new Date(video.createdAt) <= new Date(endDate)
                    : true;
            return nameMatch && idMatch && dateMatch;
        });
    };

    const showModal = (video) => {
        setVideoCurrentFocus(video);
        setOpenModal(true);
    };
    const handleCancel = () => {
        setOpenModal(false);
    };
    const handleDelete = () => {
        ConfirmDeleteAlertDialog('Delete video', 'Are you sure you want to delete this video?', async () => {
            const status = await deleteVideo(videoCurrentFocus.id);
            if (status === 200) {
                const newVideos = videos.filter((video) => video.id !== videoCurrentFocus.id);
                setVideos(newVideos);
                MessageSuccess('Delete video successfully');
            }
            setOpenModal(false);
        });
    };
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '10%',
        },
        {
            title: 'Created at',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: '15%',
            render: (createdAt) => <div>{formatDateTime(new Date(createdAt))}</div>,
        },
        {
            title: 'Creator name',
            dataIndex: 'Creator',
            key: 'Creator',
            width: '15%',
            render: (Creator) => <div>{Creator.user_name}</div>,
        },
        {
            title: 'Description',
            key: 'description',
            dataIndex: 'description',
            width: '35%',
            render: (description) => (
                <Tooltip title={description}>
                    <div className={cx('description')}>{description}</div>,
                </Tooltip>
            ),
        },
        {
            title: 'Likes',
            key: 'likes',
            dataIndex: 'Likes',
            render: (likes) => <div>{likes.length}</div>,
        },
        {
            title: 'Comments',
            key: 'comments',
            dataIndex: 'Comments',
            render: (comments) => <div>{comments.length}</div>,
        },
        {
            title: '',
            key: 'video',
            dataIndex: 'video',
            width: '5%',
            render: (_, video) => (
                <div style={{ cursor: 'pointer' }} onClick={() => showModal(video)}>
                    <IoPlayCircle />
                </div>
            ),
        },
    ];

    useEffect(() => {
        const fetchVideos = async () => {
            setLoading(true);
            const videos = await getListVideos();
            setVideos(videos ?? []);
            setLoading(false);
        };

        fetchVideos();
    }, []);
    return loading ? (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LoadingIcon size={100} color="var(--primary)" />
        </div>
    ) : (
        <div id="AdminVideoPage">
            <div>
                <Form
                    name="basic"
                    wrapperCol={{
                        span: 24,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    layout={'inline'}
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    style={{ justifyContent: 'space-between' }}
                    autoComplete="off"
                >
                    <Form.Item name="creator" style={{ width: '20%' }}>
                        <div>
                            <div className={cx('label-search')}>Creator</div>
                            <Input placeholder="Enter creator name" onChange={(e) => setNameFilter(e.target.value)} />
                        </div>
                    </Form.Item>

                    <Form.Item name="id" style={{ width: '20%' }}>
                        <div>
                            <div className={cx('label-search')}>ID</div>
                            <Input placeholder="Enter ID of video" onChange={(e) => setIdFilter(e.target.value)} />
                        </div>
                    </Form.Item>
                    <Form.Item name="startDate" style={{ width: '20%' }}>
                        <div>
                            <div className={cx('label-search')}>Start date</div>
                            <DatePicker
                                style={{ width: '100%' }}
                                format={'DD/MM/YYYY'}
                                onChange={(value) => {
                                    setStartDate(value ? dayjsToDateTime(value) : null);
                                }}
                            />
                        </div>
                    </Form.Item>
                    <Form.Item name="endDate" style={{ width: '20%' }}>
                        <div>
                            <div className={cx('label-search')}>End date</div>
                            <DatePicker
                                style={{ width: '100%' }}
                                format={'DD/MM/YYYY'}
                                onChange={(value) => setEndDate(value ? dayjsToDateTime(value) : null)}
                            />
                        </div>
                    </Form.Item>
                </Form>
            </div>
            <div style={{ marginTop: '3rem', paddingLeft: '2rem', paddingRight: '2rem' }}>
                <Table
                    pagination={{ pageSize: 6 }}
                    columns={columns}
                    dataSource={filterVideos(videos, nameFilter, idFilter, startDate, endDate)}
                />
            </div>
            <Modal
                onCancel={handleCancel}
                open={openModal}
                styles={{
                    content: { backgroundColor: 'unset', padding: '0', boxShadow: 'none', textAlign: 'center' },
                }}
                wrapClassName="modal-video"
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" danger onClick={handleDelete}>
                        Delete
                    </Button>,
                ]}
                closable={false}
            >
                <ModalContent video={videoCurrentFocus} />
            </Modal>
        </div>
    );
};

export default AdminVideoPage;
