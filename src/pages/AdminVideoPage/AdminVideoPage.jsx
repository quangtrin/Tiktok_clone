import classNames from 'classnames/bind';
import styles from './AdminVideoPage.module.scss';
import { Avatar, Form, Input, Button, DatePicker, Tag, Space, Table, Select, Modal } from 'antd';
import { IoPlayCircle } from 'react-icons/io5';
import './AdminVideoPageLibrary.scss';
import FooterRight from '~/components/VideoWatching/VideoCard/FooterRight';
import { useState } from 'react';
const cx = classNames.bind(styles);

const data = [
    {
        id: '1',
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        id: '2',
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        id: '3',
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

const ModalContent = () => {
    return (
        <>
            <div className={cx('video')}>
                <video
                    className={cx('player')}
                    id={1}
                    // onClick={onVideoPress}
                    // ref={(ref) => {
                    //     videoRef.current = ref;
                    //     setVideoRef(ref);
                    // }}
                    loop
                    src={'https://youtu.be/lMKfZwnHzig'}
                    muted={false}
                ></video>
                <div className={cx('bottom-controls')}>
                    <div className={cx('footer-right')}>
                        {/* The right part of the container */}
                        {/* <FooterRight
                        // profilePic={profilePic}
                        // video={video}
                        // setOpenComment={setOpenComment}
                        // openComment={openComment}
                        /> */}
                    </div>
                </div>
            </div>
        </>
    );
};
const AdminVideoPage = () => {
    const [openModal, setOpenModal] = useState(false);
    const showModal = () => {
        setOpenModal(true);
    };
    const handleCancel = () => {
        setOpenModal(false);
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
        },
        {
            title: 'Creator name',
            dataIndex: 'username',
            key: 'username',
            width: '15%',
        },
        {
            title: 'Description',
            key: 'email',
            dataIndex: 'email',
            width: '35%',
        },
        {
            title: 'Duration',
            key: 'videosCount',
            dataIndex: 'videosCount',
            width: '10%',
        },
        {
            title: '',
            key: '',
            width: '5%',
            render: (record) => (
                <div style={{ cursor: 'pointer' }} onClick={showModal}>
                    <IoPlayCircle />
                </div>
            ),
        },
    ];
    return (
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
                            <Input placeholder="Enter creator name" />
                        </div>
                    </Form.Item>

                    <Form.Item name="id" style={{ width: '20%' }}>
                        <div>
                            <div className={cx('label-search')}>ID</div>
                            <Input placeholder="Enter ID of video" />
                        </div>
                    </Form.Item>
                    <Form.Item name="startDate" style={{ width: '20%' }}>
                        <div>
                            <div className={cx('label-search')}>Start date</div>
                            <DatePicker style={{ width: '100%' }} />
                        </div>
                    </Form.Item>
                    <Form.Item name="endDate" style={{ width: '20%' }}>
                        <div>
                            <div className={cx('label-search')}>End date</div>
                            <DatePicker style={{ width: '100%' }} />
                        </div>
                    </Form.Item>
                </Form>
            </div>
            <div style={{ marginTop: '3rem', paddingLeft: '2rem', paddingRight: '2rem' }}>
                <Table columns={columns} dataSource={data} />
            </div>
            <Modal
                onCancel={handleCancel}
                open={openModal}
                styles={{
                  content: {backgroundColor: "unset", padding: "0", boxShadow: 'none'}
                }}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" danger>
                        Delete
                    </Button>,
                ]}
                closable={false}
            >
                <ModalContent />
            </Modal>
        </div>
    );
};

export default AdminVideoPage;
