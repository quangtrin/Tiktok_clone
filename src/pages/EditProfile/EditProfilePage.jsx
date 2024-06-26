import classNames from 'classnames/bind';
import styles from './EditProfile.module.scss';
import { DatePicker, Form, Input, Radio, Upload, Avatar, Tooltip, Spin } from 'antd';
import { useEffect, useState } from 'react';
import Button from '~/components/Button/Button';
// import Button from '~/components/Button';
import { useDispatch } from 'react-redux';
import './EditProfileLibrary.scss';
import { updateInformation } from '~/redux/userCurrentSlice';
import { getCurrentUser, updateCurrentUser } from '~/services/API/userService';
import dayjs from 'dayjs';
import { ErrorAlertDialog, SuccessAlertDialog } from '~/components/AlertDialog/AlertDialog';
import { LoadingOutlined } from '@ant-design/icons';
import './EditProfileLibrary.scss';
import { datetimeToDayjs } from '~/utils/function';
const { TextArea } = Input;

const cx = classNames.bind(styles);
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const EditProfilePage = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingButton, setLoadingButton] = useState(false);

    const handleImageChange = (info) => {
        const file = info.file.originFileObj;
        setImage(URL.createObjectURL(file));
    };

    const onFinish = async (values) => {
        setLoadingButton(true);
        const userName = form.getFieldValue('name');
        const description = form.getFieldValue('description');
        const gender = form.getFieldValue('gender');
        const birthday = form.getFieldValue('birthday');
        const avatar = form.getFieldValue('avatar');
        const status = await updateCurrentUser(userName, gender, description, birthday, avatar);
        if (status === 200) {
            SuccessAlertDialog('Updated', 'Updated', () => window.location.reload());
        } else {
            ErrorAlertDialog('Error', 'Failed');
        }
        setLoadingButton(false);
    };

    useEffect(() => {
        const getCurrentUserData = async () => {
            setLoading(true);
            const currentUser = await getCurrentUser();
            dispatch(updateInformation(currentUser));
            setImage(currentUser.avatar);
            form.setFieldValue('name', currentUser.user_name);
            form.setFieldValue('description', currentUser.description);
            form.setFieldValue('gender', currentUser.gender);
            form.setFieldValue('id', currentUser.name_id);
            if (currentUser.birthday) {
                form.setFieldValue('birthday', datetimeToDayjs(currentUser.birthday));
            }
            setLoading(false);
        };

        getCurrentUserData();
    }, [dispatch, form]);

    return loading ? (
        <Spin />
    ) : (
        <div className={cx('edit-profile-layout')} id="Edit-Profile">
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                style={{
                    maxWidth: '600rem',
                    margin: 'auto',
                }}
                onSubmit={(e) => {
                    e.preventDefault();
                }}
                onFinish={onFinish}
                form={form}
                className={cx('form')}
            >
                <Form.Item label="Avatar" valuePropName="fileList" getValueFromEvent={normFile} name={'avatar'}>
                    <Upload
                        onChange={handleImageChange}
                        name="avatar"
                        className="avatar-uploader"
                        listType="picture-circle"
                        showUploadList={false}
                        multiple={true}
                    >
                        {image ? (
                            <Tooltip title="change">
                                <Avatar src={image} style={{ width: '100%', height: '100%' }} />
                            </Tooltip>
                        ) : (
                            <button style={{ border: 0, background: 'none' }} type="button">
                                <div style={{ marginTop: '8rem' }}>Upload</div>
                            </button>
                        )}
                    </Upload>
                </Form.Item>
                <Form.Item label="Gender" name={'gender'}>
                    <Radio.Group>
                        <Radio value="Male"> Male </Radio>
                        <Radio value="Female"> Female </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Name" name={'name'}>
                    <Input />
                </Form.Item>
                <Form.Item label="Id" name={'id'}>
                    <Input disabled />
                </Form.Item>
                <Form.Item label="Description" name={'description'}>
                    <TextArea />
                </Form.Item>
                <Form.Item label="Birthday" name={'birthday'}>
                    <DatePicker format={'DD/MM/YYYY'} style={{ width: '100%' }} allowClear={false}/>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 14,
                    }}
                >
                    <Button primary>
                        {loadingButton ? (
                            <Spin
                                indicator={
                                    <LoadingOutlined style={{ fontSize: '1.8rem', color: 'var(--white)' }} spin />
                                }
                            />
                        ) : (
                            'Save'
                        )}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditProfilePage;
