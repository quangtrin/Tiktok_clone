import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Avatar, Tooltip, Input } from 'antd';
import Button from '../../components/Button/Button';
import { Comment } from '@ant-design/compatible';
import React, { createElement, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import './CommentCustomLibrary.scss';
import { useSelector, useDispatch } from 'react-redux';
import { changeReplyCurrent } from '~/redux/commentSlice';
import { addCommentChild } from '~/redux/commentSlice';
import { postComments } from '~/services/API/commentService';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './styles.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const CommentCustom = ({ children, comment }) => {
    const dispatch = useDispatch();
    const navigation = useNavigate();
    // const { commentId } = useParams();
    const location = useLocation();
    const commentRef = useRef(null);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [content, setContent] = useState('');
    const [action, setAction] = useState(null);
    const [isCommentFocus, setIsCommentFocus] = useState(false);
    const replyCurrentId = useSelector((state) => state.comment.replyCurrentId);
    const socket = useSelector((state) => state.socket.socket);

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
                const commentParentId = comment.comment_parent_id || comment.id;
                const newComment = await postComments(comment.video_id, content, socket, commentParentId);
                dispatch(addCommentChild(newComment));
                setContent('');
            } catch (error) {}
        }
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const commentId = queryParams.get('comment');
        if (`${comment.id}` === `${commentId}`) {
            commentRef.current.scrollIntoView();
            queryParams.delete('comment');
            navigation({
                search: queryParams.toString(),
                replace: true,
            });
            setIsCommentFocus(true);
        }
    }, [isCommentFocus, commentRef, navigation, location.search, comment.id]);

    return (
        <div
            id="comment"
            ref={commentRef}
            className={isCommentFocus ? cx('comment-focus', 'content') : cx('content')}
        >
            <Comment
                actions={actions}
                author={
                    <Link
                        onClick={() => {
                            navigation(`/user/@${comment.User.id}`);
                        }}
                    >
                        {comment.User.user_name}
                    </Link>
                }
                avatar={
                    <Avatar
                        onClick={() => {
                            navigation(`/user/@${comment.User.id}`);
                        }}
                        src={comment.User.avatar}
                        alt={comment.User.user_name}
                    />
                }
                content={<p>{comment.content}</p>}
                datetime={<span>{dayjs(comment.createdAt).format('HH:mm:ss DD-MM-YYYY')}</span>}
            >
                {children}
                {replyCurrentId?.toString() === comment.id?.toString() && (
                    <div style={{ display: 'flex', marginBottom: '1rem', justifyContent: 'space-between' }}>
                        <Input onChange={handleOnChangeComment} value={content} onPressEnter={handleSubmitComment} />
                        <div style={{ textAlign: 'right' }}>
                            <Button
                                primary
                                onClick={handleSubmitComment}
                                style={{ marginLeft: '1em', minWidth: '5rem' }}
                            >
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
