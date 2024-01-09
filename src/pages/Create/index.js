import { InboxOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import config from '~/config';
import { Button, Form, Input, Select, Space, Upload } from 'antd';
import Swal from 'sweetalert2';
import axios from 'axios';
const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};
const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

function Create() {
    const [loading, setLoading] = useState(false);
    const onFinish = async (values) => {
        setLoading(true);
        const tokenSession = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('video', values.dragger[0].originFileObj);
        formData.append('description', values.description);
        formData.append('song', 'default');
        try {
            const res = await axios.post(`${config.baseUrl}/api/video/upload`, formData, {
                headers: {
                    Authorization: `Bearer ${tokenSession}`,
                },
            });
            if (res.status === 200) {
                Swal.fire({
                    title: 'Upload successfully!',
                    text: 'Upload successfully!',
                    icon: 'success',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/';
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    };
    return (
        <Form
            name="validate_other"
            {...formItemLayout}
            onFinish={onFinish}
            onSubmit={(e) => {
                e.preventDefault();
            }}
            initialValues={{
                'input-number': 3,
                'checkbox-group': ['A', 'B'],
                rate: 3.5,
                'color-picker': null,
            }}
            style={{
                maxWidth: 600,
            }}
        >
            <Form.Item label="Dragger">
                <Form.Item
                    name="dragger"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    noStyle
                    rules={[
                        {
                            required: true,
                            message: 'Please choose your video!',
                        },
                    ]}
                >
                    <Upload.Dragger name="files" action="/upload.do">
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Upload.Dragger>
                </Form.Item>
            </Form.Item>
            <Form.Item label="Description" name="description">
                <Input />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    span: 12,
                    offset: 6,
                }}
            >
                <Space>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                    <Button htmlType="reset">reset</Button>
                </Space>
            </Form.Item>
        </Form>
    );
}
export default Create;
