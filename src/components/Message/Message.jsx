import { message } from 'antd';

const MessageSuccess = (content) => {
    message.success(content);
    return null;
};

const MessageLogin = () => {
    message.error('Please login to continue');
    return null;
};

export { MessageSuccess, MessageLogin };
