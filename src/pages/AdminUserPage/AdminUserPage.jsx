import classNames from 'classnames/bind';
import styles from './AdminUserPage.module.scss';
import { Avatar, Form, Input, Button, DatePicker, Tag, Space, Table, Select } from 'antd';
import './AdminUserPageLibrary.scss'
const cx = classNames.bind(styles);

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: "10%"
    },
    {
        title: 'Created at',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: "15%"
    },
    {
        title: 'User name',
        dataIndex: 'username',
        key: 'username',
        width: "15%"
    },
    {
        title: 'Email',
        key: 'email',
        dataIndex: 'email',
        width: "15%"
    },
    {
        title: 'Number of videos posted',
        key: 'videosCount',
        dataIndex: 'videosCount',
        width: "15%"
    },
    {
        title: 'Status',
        key: 'status',
        width: "10%",
        render: (record) => (
            <div style={{padding: "0.5rem 0"}}>

                <Select style={{width: "100%"}}/>
            </div>
        )
    },
];
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
const AdminUserPage = () => {
    return (
        <div id="AdminUserPage">
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
                    <Form.Item name="username" style={{ width: '20%' }}>
                        <div>
                            <div className={cx('label-search')}>User name</div>
                            <Input placeholder="Enter user name" />
                        </div>
                    </Form.Item>

                    <Form.Item name="password" style={{ width: '20%' }}>
                        <div>
                            <div className={cx('label-search')}>ID</div>
                            <Input placeholder="Enter ID of user" />
                        </div>
                    </Form.Item>
                    <Form.Item name="password" style={{ width: '20%' }}>
                        <div>
                            <div className={cx('label-search')}>Start date</div>
                            <DatePicker style={{ width: '100%' }} />
                        </div>
                    </Form.Item>
                    <Form.Item name="password" style={{ width: '20%' }}>
                        <div>
                            <div className={cx('label-search')}>End date</div>
                            <DatePicker style={{ width: '100%' }} />
                        </div>
                    </Form.Item>
                </Form>
            </div>
            <div style={{marginTop: "3rem", paddingLeft: "2rem", paddingRight: "2rem"}}>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    );
};

export default AdminUserPage;
