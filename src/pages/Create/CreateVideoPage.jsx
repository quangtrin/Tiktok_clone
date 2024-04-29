import { InboxOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Form, Input, Space, Upload } from 'antd';
import Swal from 'sweetalert2';
import { createVideo } from '~/services/API/videoService';
import { useNavigate } from 'react-router-dom';
import "./CreateVideoLibrary.scss"
import Button from '~/components/Button/Button';
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

function CreateVideoPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const onFinish = async (values) => {
        setLoading(true);
        const status = await createVideo(values.dragger[0].originFileObj, values.description, 'default');
        if (status === 200) {
            Swal.fire({
                title: 'Upload successfully!',
                text: 'Upload successfully!',
                icon: 'success',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/');
                }
            });
        }
        setLoading(false);
    };
    return (
        <div id="Create-video">
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
                    margin: 'auto',
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
                        offset: 11,
                    }}
                >
                    <Space>
                        <Button primary htmlType="submit" loading={loading}>
                            Submit
                        </Button>
                        <Button outline htmlType="reset">reset</Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
}
export default CreateVideoPage;
