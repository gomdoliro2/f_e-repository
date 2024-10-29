import React, { useState } from 'react';
import Header from '../components/Header.js';
import { useLocation, useNavigate } from 'react-router-dom'; 
import picture2 from '../img/frame.png';
import picture3 from '../img/heart.png';
import '../styled_components/Post.css';

const Post = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id = '', title = '', content = '' } = location.state || {};

    const username = localStorage.getItem('username') || 'Jin_venus08'; 
    const [titleState, setTitleState] = useState(title);
    const [contentState, setContentState] = useState(content);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEdit = () => {
        navigate('/new-post', {
            state: { 
                title: titleState, 
                content: contentState,
                id: id
            },
        });
    };

    const handleDelete = () => {
        setIsModalOpen(true);
    };

    const cancelDelete = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="post-container">
            <Header username={username} />
            <div className="post-form">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input 
                        className="title-show" 
                        value={titleState} 
                        readOnly 
                        onChange={(e) => setTitleState(e.target.value)}
                    />
                    <button className="edit-button" onClick={handleEdit}>수정</button>
                    <button className="delete-button" onClick={handleDelete}>삭제</button>
                </div>
                <textarea 
                    className="textarea" 
                    value={contentState} 
                    readOnly 
                    onChange={(e) => setContentState(e.target.value)}
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
                        <div id="small">0</div>
                    </div>
                    <div className="author-details">
                        <p id="postwrite">  {username}</p>
                        <button className="follow-button">팔로우</button>
                    </div>
                    <img src={picture2} alt="face-symbol" className="author-image" />
                </div>
            </div>
        </div>
            <div className="comment-section">
                <textarea
                    type="text" 
                    className="comment-input" 
                    placeholder="댓글 작성"
                />
                <button className="add-comment-button">작성하기</button>
            </div>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <p className="modal-text"> 이 글을 삭제하시겠습니까?</p>
                        <button className="cancel-button" onClick={cancelDelete}>취소</button>
                        <button className="modal-delete-button">삭제</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Post;