import React from 'react';
import { Upload, message } from 'antd'; // Đường dẫn đến file CSS của bạn
import styles from "./UploadImage.scss"


const ImageUpload = ({children, onChange}) => {
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const handleChange = (info) => {
        if (!info.file.originFileObj) {
            return;
        }
        onChange(info)
    }

    return (
        <Upload
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            className={"customSelect"}
        >
            {children}
        </Upload>
    );
};

export default ImageUpload;
