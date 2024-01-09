// import { Avatar } from 'antd';
// import { Comment } from '@ant-design/compatible';
// import classNames from 'classnames/bind';
// import styles from './styles.module.scss';
// import "./Library.scss"

// const cx = classNames.bind(styles);
// const CommentCustom = ({ children, comment }) => (
//     <div className='comment'>
//         <Comment
//             actions={[<span key="comment-nested-reply-to">Reply to</span>]}
//             author={<a>{comment.User.user_name}</a>}
//             avatar={
//                 <Avatar src="https://variety.com/wp-content/uploads/2021/04/Avatar.jpg" alt={comment.User.user_name} />
//             }
//             content={<p className={cx('content')}>{comment.content}</p>}
//         >
//             {children}
//         </Comment>
//     </div>
// );

// export default CommentCustom;

import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Avatar, Tooltip } from 'antd';
import { Comment } from '@ant-design/compatible';
import React, { createElement, useState } from 'react';
import dayjs from 'dayjs';
const CommentCustom = ({ children, comment }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };
  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };
  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ];
  return (
    <Comment
      actions={actions}
      author={<a>{comment.User.user_name}</a>}
      avatar={<Avatar src="https://variety.com/wp-content/uploads/2021/04/Avatar.jpg" alt={comment.User.user_name} />}
      content={
        <p>
          {comment.content}
        </p>
      }
      datetime={
        <Tooltip title="2016-11-22 11:22:33">
          <span>{dayjs(comment.createdAt).format("HH:mm:ss DD-MM-YYYY")}</span>
        </Tooltip>
      }
    />
  );
};
export default CommentCustom;
