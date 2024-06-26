import classNames from 'classnames/bind';
import styles from './AdminUserPage.module.scss';
import { Avatar, Form, Input, Button, DatePicker, Tag, Space, Table, Select } from 'antd';
import './AdminUserPageLibrary.scss';
import { useEffect } from 'react';
import { useState } from 'react';
import { getAllUsers, unblockUser } from '~/services/API/userService';
import { LoadingIcon } from '~/components/Icons/Icons';
import { dayjsToDateTime, formatDateTime } from '~/utils/function';
import { MessageSuccess } from '~/components/Message/Message';
import { blockUser } from '~/services/API/userService';
import { ConfirmDeleteAlertDialog } from '~/components/AlertDialog/AlertDialog';
const cx = classNames.bind(styles);

const SelectStatus = ({ user }) => {
    const [status, setStatus] = useState(user.status);
    const selectValue = [
        { value: 'blocked', label: 'Blocked' },
        { value: 'active', label: 'Active' },
    ];

    const blockAction = async () => {
        ConfirmDeleteAlertDialog('Block user', 'Are you sure you want to block this user?', async () => {
            const status = await blockUser(user.id);
            if (status === 200) {
                MessageSuccess('Block user successfully');
                setStatus('blocked');
            }
        });
    };

    const unblockAction = async () => {
        const status = await unblockUser(user.id);
        if (status === 200) {
            MessageSuccess('Unblock user successfully');
            setStatus('active');
        }
    };

    const handleChangeStatus = async (value) => {
        if (value === 'blocked') {
            blockAction();
        } else {
            unblockAction();
        }
    };
    return (
        <div style={{ padding: '0.5rem 0' }}>
            <Select style={{ width: '100%' }} options={selectValue} value={status} onChange={handleChangeStatus} />
        </div>
    );
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
        title: 'User name',
        dataIndex: 'user_name',
        key: 'username',
        width: '15%',
    },
    {
        title: 'Email',
        key: 'email',
        dataIndex: 'email',
        width: '15%',
    },
    {
        title: 'Number of videos posted',
        key: 'videosCount',
        dataIndex: 'videosCount',
        width: '15%',
        render: (videosCount) => <div style={{ textAlign: 'center' }}>{videosCount}</div>,
    },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'user',
        width: '10%',
        render: (_, user) => <SelectStatus user={user} />,
    },
];

const AdminUserPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nameFilter, setNameFilter] = useState('');
    const [idFilter, setIdFilter] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const filterUsers = (users, nameFilter, idFilter, startDate, endDate) => {
        return users.filter((user) => {
            const nameMatch =
                nameFilter && nameFilter !== ''
                    ? user.user_name.toLowerCase().includes(nameFilter.toLowerCase())
                    : true;
            const idMatch = idFilter && idFilter !== '' ? user.id.toString() === idFilter : true;
            const dateMatch =
                startDate && endDate
                    ? new Date(user.createdAt) >= new Date(startDate) && new Date(user.createdAt) <= new Date(endDate)
                    : true;
            return nameMatch && idMatch && dateMatch;
        });
    };

    const handleNameFilterChange = (e) => {
        setNameFilter(e.target.value);
    };

    const handleIdFilterChange = (e) => {
        setIdFilter(e.target.value);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date ? dayjsToDateTime(date) : null);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date ? dayjsToDateTime(date) : null);
    };
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const users = await getAllUsers();
                setUsers(users ?? []);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchUsers();
    }, []);

    return loading ? (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LoadingIcon size={100} color="var(--primary)" />
        </div>
    ) : (
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
                            <Input placeholder="Enter user name" onChange={handleNameFilterChange} />
                        </div>
                    </Form.Item>

                    <Form.Item name="password" style={{ width: '20%' }}>
                        <div>
                            <div className={cx('label-search')}>ID</div>
                            <Input placeholder="Enter ID of user" onChange={handleIdFilterChange} />
                        </div>
                    </Form.Item>
                    <Form.Item name="password" style={{ width: '20%' }}>
                        <div>
                            <div className={cx('label-search')}>Start date</div>
                            <DatePicker
                                style={{ width: '100%' }}
                                format={'DD/MM/YYYY'}
                                onChange={handleStartDateChange}
                            />
                        </div>
                    </Form.Item>
                    <Form.Item name="password" style={{ width: '20%' }}>
                        <div>
                            <div className={cx('label-search')}>End date</div>
                            <DatePicker
                                style={{ width: '100%' }}
                                format={'DD/MM/YYYY'}
                                onChange={handleEndDateChange}
                            />
                        </div>
                    </Form.Item>
                </Form>
            </div>
            <div style={{ marginTop: '3rem', paddingLeft: '2rem', paddingRight: '2rem' }}>
                <Table
                    pagination={{ pageSize: 7 }}
                    columns={columns}
                    dataSource={filterUsers(users, nameFilter, idFilter, startDate, endDate)}
                />
            </div>
        </div>
    );
};

export default AdminUserPage;
