import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import React from 'react';
import {
    Button,
    Checkbox,
    Col,
    ColorPicker,
    Form,
    Input,
    Radio,
    Rate,
    Row,
    Select,
    Slider,
    Space,
    Switch,
    Upload,
} from 'antd';
const { Option } = Select;
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
const onFinish = (values) => {
    console.log('Received values of form: ', values);
};
function Create() {
    return (
        <Form
            name="validate_other"
            {...formItemLayout}
            onFinish={onFinish}
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
            <Form.Item label="Key">
                <Select mode="tags" style={{ width: '100%' }} placeholder="Enter key" />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    span: 12,
                    offset: 6,
                }}
            >
                <Space>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="reset">reset</Button>
                </Space>
            </Form.Item>
        </Form>
    );
}
export default Create;
