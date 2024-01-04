import { Avatar } from 'antd';
import { Comment } from "@ant-design/compatible";
const CommentCustom = ({ children }) => (
    <Comment
        actions={[<span key="comment-nested-reply-to">Reply to</span>]}
        author={<a>Han Solo</a>}
        avatar={<Avatar src="https://variety.com/wp-content/uploads/2021/04/Avatar.jpg" alt="Han Solo" />}
        content={
            <p>
                We supply a series of design principles, practical patterns and high quality design resources (Sketch
                and Axure).
            </p>
        }
    >
        {children}
    </Comment>
);

export default CommentCustom;
