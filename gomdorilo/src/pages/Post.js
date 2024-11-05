import React, { useState, useEffect } from 'react';
import Header from '../components/Header.js';
import { useLocation, useNavigate } from 'react-router-dom'; 
import { deleteBoard, commentData, getBoardById, updateComment, deleteComment } from '../api.js'; 
import picture2 from '../img/frame.png';
import picture3 from '../img/heart.png';
import picture4 from '../img/arrow.png';
import '../styled_components/Post.css';

const Post = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id = '', title = '', content = '' } = location.state || {};
    const username = localStorage.getItem('username') || 'Jin_venus08';

    const [postTitle] = useState(title);
    const [postContent] = useState(content);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [editCommentId, setEditCommentId] = useState(null);
    const [editCommentText, setEditCommentText] = useState('');

    useEffect(() => {
        const loadComments = async () => {
            try {
                const boardData = await getBoardById(id);
                setComments(boardData.comments || []);
            } catch (error) {
                console.error("댓글 불러오기 오류:", error);
                alert("댓글을 불러오는데 실패했습니다.");
            }
        };
        loadComments();
    }, [id]);

    const handleEdit = () => {
        navigate('/post-edit', { state: { id, title: postTitle, content: postContent } });
    };

    const handleDelete = () => setIsModalOpen(true);
    const cancelDelete = () => setIsModalOpen(false);

    const handlePostDelete = async () => {
        try {
            await deleteBoard(id);
            alert('게시글이 삭제되었습니다.');
            setIsModalOpen(false);
            navigate('/main'); 
        } catch (error) {
            console.error("게시글 삭제 오류:", error);
            alert("게시글 삭제에 실패했습니다.");
        }
    };

    const handleCommentChange = (e) => setComment(e.target.value);

    const handleCommentSubmit = async (e) => {
        e.preventDefault(); 
        if (comment.trim()) {
            try {
                const newComment = await commentData(id, { content: comment.trim() }); 
                setComments((prevComments) => [...prevComments, newComment]); 
                setComment('');
            } catch (error) {
                console.error("댓글 작성 오류:", error);
                alert("댓글 작성에 실패했습니다."); 
            }
        } else {
            alert("댓글을 입력해 주세요."); 
        }
    };

    const handleCommentCancel = () => setComment('');

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
        <div className="post-container">
            <Header username={username} />
            <div className="post-form">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input 
                        className="title-show" 
                        value={postTitle} 
                        readOnly 
                    />
                    <button className="sum-button">
                        <img src={picture4} alt="arrow" className="arrow" />요약하기
                    </button>
                    <button className="edit-button" onClick={handleEdit}>수정</button>
                    <button className="delete-button" onClick={handleDelete}>삭제</button>
                </div>
                <div className="black-line"></div>
                <textarea 
                    className="textarea" 
                    value={postContent} 
                    readOnly
                />
                <div className="divider">
                    <div className="author-info">
                        <div id="comm">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={picture3} alt="heart" id="heart" />
                            </div>
                        </div>
                        <div id="comm">
                            추천
                            <div id="small">0</div>
                        </div>
                        <div id="comm">
                            댓글
                            <div id="small">{comments.length}</div> 
                        </div>
                        <div className="author-details">
                            <p id="postwrite">{username}</p>
                            <button className="follow-button">팔로우</button>
                        </div>
                        <img src={picture2} alt="face-symbol" className="author-image" />
                    </div>
                </div>
            </div>
            <div className="comment-section">
                <form id="formedit" onSubmit={handleCommentSubmit}>
                    <textarea 
                        id="comment" 
                        placeholder='댓글 작성' 
                        value={comment} 
                        onChange={handleCommentChange}
                    ></textarea>
                    <button type="submit" className="add-comment-button">작성</button>
                    <button type="button" className="close-comment-button" onClick={handleCommentCancel}>취소</button>
                </form>
                <div className="comments-list">
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment.id} className="comment-item">
                                {editCommentId === comment.id ? (
                                    <div>
                                        <textarea 
                                            value={editCommentText} 
                                            onChange={handleEditCommentChange}
                                        />
                                        <button onClick={() => handleEditCommentSubmit(comment.id)}>수정 완료</button>
                                    </div>
                                ) : (
                                    <div>
                                        {comment.content}
                                        <button onClick={() => {
                                            setEditCommentId(comment.id);
                                            setEditCommentText(comment.content);
                                        }}>수정</button>
                                        <button onClick={() => handleCommentDelete(comment.id)}>삭제</button>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="no-comments">댓글이 없습니다</div> 
                    )}
                </div>
            </div>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <p className="modal-text">이 글을 삭제하시겠습니까?</p>
                        <button className="cancel-button" onClick={cancelDelete}>취소</button>
                        <button className="modal-delete-button" onClick={handlePostDelete}>삭제</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Post;