import React, { useState, useEffect } from 'react';
import { commentData, updateComment, deleteComment, getBoardById } from '../api.js';
import '../styled_components/Post.css';
import '../styled_components/Comment.css';
import picture2 from '../img/frame.png';
import picture3 from '../img/dot.png';

const Comment = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [editCommentId, setEditCommentId] = useState(null);
    const [editCommentText, setEditCommentText] = useState('');
    const [loading, setLoading] = useState(false);
    const [nickname] = useState('익명');

    useEffect(() => {
        const loadComments = async () => {
            setLoading(true);
            try {
                const boardData = await getBoardById(postId);
                setComments(boardData.comments || []);
            } catch (error) {
                console.error("댓글 불러오기 오류:", error);
                alert("댓글을 불러오는데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };
        loadComments();
    }, [postId]);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        if (isNaN(date)) {
            return '2024.11.08';
        }
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        
        return `${year}.${month}.${day}`;
    };

    const handleCommentChange = (e) => setComment(e.target.value);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (comment.trim()) {
            setLoading(true);
            try {
                const newComment = await commentData(postId, { content: comment.trim() });
                newComment.timestamp = new Date().toISOString(); // 댓글 작성 시간 저장
                setComments((prevComments) => [...prevComments, newComment]);
                setComment('');
            } catch (error) {
                console.error("댓글 작성 오류:", error);
                alert("댓글 작성에 실패했습니다.");
            } finally {
                setLoading(false);
            }
        } else {
            alert("댓글을 입력해 주세요.");
        }
    };

    const handleEditCommentChange = (e) => setEditCommentText(e.target.value);

    const handleEditCommentSubmit = async (commentId) => {
        try {
            await updateComment(commentId, editCommentText);
            setComments((prevComments) => 
                prevComments.map((c) => (c.id === commentId ? { ...c, content: editCommentText } : c))
            );
            setEditCommentId(null);
            setEditCommentText('');
        } catch (error) {
            console.error("댓글 수정 오류:", error);
            alert("댓글 수정에 실패했습니다.");
        }
    };

    const handleCommentDelete = async (commentId) => {
        try {
            await deleteComment(commentId);
            setComments((prevComments) => prevComments.filter((c) => c.id !== commentId));
            alert('댓글이 삭제되었습니다.');
        } catch (error) {
            console.error("댓글 삭제 오류:", error);
            alert("댓글 삭제에 실패했습니다.");
        }
    };

    return (
        <div className="comment-section">
            <form onSubmit={handleCommentSubmit}>
                <textarea 
                    placeholder="댓글 작성" 
                    value={comment} 
                    className="postwrite"
                    onChange={handleCommentChange}
                    disabled={loading}
                />
                <div className="black_line"></div>
                <button type="button" className="cancel-btn" onClick={() => setComment('')}>취소</button>
                <button type="submit" className="add-comment-button" disabled={loading}>작성</button>
            </form>
            <div className="comments-list">
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.id} className="comment-item">
                            <img src={picture2} alt="프로필 이미지" className="profile-pic" />
                            <div className="comment-header">
                                <span className="nickname">{nickname}</span>
                                <span className="timestamp">{formatDate(comment.timestamp)}</span>
                            </div>
                            {editCommentId === comment.id ? (
                                <div>
                                    <textarea 
                                        value={editCommentText} 
                                        onChange={handleEditCommentChange}
                                    />
                                    <button onClick={() => handleEditCommentSubmit(comment.id)}>수정 완료</button>
                                    <button onClick={() => setEditCommentId(null)}>취소</button>
                                </div>
                            ) : (
                                <div className='group'>
                                    <p>{comment.content}</p>
                                    <div className="comment-actions">
                                        <img 
                                            src={picture3} 
                                            alt="옵션" 
                                            className="edit-icon" 
                                            onClick={() => {
                                                setEditCommentId(comment.id);
                                                setEditCommentText(comment.content);
                                            }}
                                        />
                                        <button onClick={() => handleCommentDelete(comment.id)} className="comment-delete-button">삭제</button>
                                    </div>
                                    <button className="reply-button">+ 답글달기</button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="no-comments">댓글이 없습니다</div>
                )}
            </div>
        </div>
    );
};

export default Comment;