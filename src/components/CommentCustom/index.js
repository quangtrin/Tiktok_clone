import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Avatar, Tooltip, Input, Button } from 'antd';
import { Comment } from '@ant-design/compatible';
import React, { createElement, useState } from 'react';
import dayjs from 'dayjs';
import './Library.scss';
import { useSelector, useDispatch } from 'react-redux';
import { changeReplyCurrent } from '~/redux/commentSlice';
import { addCommentChild } from '~/redux/commentSlice';
import { postComments } from '~/services/commentService';

const CommentCustom = ({ children, comment }) => {
    const dispatch = useDispatch();
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [content, setContent] = useState('');
    const [action, setAction] = useState(null);
    const replyCurrentId = useSelector((state) => state.comment.replyCurrentId);
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

    const handleReply = () => {
        dispatch(changeReplyCurrent(comment.comment_parent_id || comment.id));
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
        <span key="comment-basic-reply-to" onClick={handleReply}>
            Reply to
        </span>,
    ];

    const handleOnChangeComment = (event) => {
        setContent(event.target.value);
    };
    const handleSubmitComment = async () => {
        if (comment) {
            try {
                const commentParentId = comment.comment_parent_id || comment.id
                const newComment = await postComments(comment.video_id, content, commentParentId);
                dispatch(addCommentChild(newComment));
                setContent('');
            } catch (error) {}
        }
    };

    return (
        <div className="comment">
            <Comment
                actions={actions}
                author={<a>{comment.User.user_name}</a>}
                avatar={
                    <Avatar
                        src="https://variety.com/wp-content/uploads/2021/04/Avatar.jpg"
                        alt={comment.User.user_name}
                    />
                }
                content={<p>{comment.content}</p>}
                datetime={
                    <Tooltip title="2016-11-22 11:22:33">
                        <span>{dayjs(comment.createdAt).format('HH:mm:ss DD-MM-YYYY')}</span>
                    </Tooltip>
                }
            >
                {children}
                {replyCurrentId == comment.id && (
                    <div style={{ display: 'flex', marginBottom: '10px' }}>
                        <Input onChange={handleOnChangeComment} value={content} onPressEnter={handleSubmitComment} autoFocus/>
                        <div style={{ textAlign: 'right' }}>
                            <Button type="primary" onClick={handleSubmitComment} style={{ marginLeft: '10px' }}>
                                Enter
                            </Button>
                        </div>
                    </div>
                )}
            </Comment>
            <></>
        </div>
    );
};
export default CommentCustom;
