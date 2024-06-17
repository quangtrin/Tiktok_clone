import { message } from 'antd';

const MessageSuccess = (content) => {
    message.success(content);
    return null;
};

export { MessageSuccess };
