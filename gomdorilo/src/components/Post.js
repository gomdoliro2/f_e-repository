import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import picture2 from '../img/frame.png';

const Post = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { title = '', content = '' } = location.state || {};

    const [titleState] = useState(title);
    const [contentState] = useState(content);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleEdit = () => {
        navigate('/new-post', {
            state: { title: titleState, content: contentState },
        });
    };

    const handleDelete = () => {
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        navigate('/'); 
    };

    const cancelDelete = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="post-container">
            <div className="header">
                <div className="logo">
                    <p>BamGallary</p>
                </div>
                <div className="search">
                    <input
                        id="search-bar"
                        type="text"
                        placeholder="검색어를 입력하세요"
                        style={{ opacity: 0 }}
                    />
                </div>
                <div className="mypost">
                    <p>내 게시물 <span> | </span> Jin_venus08 </p>
                    <img src={picture2} alt="face-symbol" className="face-icon" />
                </div>
            </div>
            <div className="post-form">
                <div className="show">
                    <input
                        type="text"
                        value={titleState}
                        readOnly
                        className="title-show"
                    />
                    <button onClick={handleEdit} id="edit">수정</button>
                    <button onClick={handleDelete} id="delete">삭제</button>
                </div>
                <div className="thin-ubderline" />
                <textarea
                    value={contentState}
                    readOnly
                    className="textarea"
                />
                <div className="thin-line" />
                <div className="show author-info">
                    <div className="good">
                        추천
                        <div className="margin">
                            <span id="num">0</span>
                        </div>
                    </div>
                    <div className="comments">
                        댓글
                        <div className="margin">
                            <span id="num">0</span>
                        </div>
                    </div>
                    <div className="author-details">
                        <p>작성자: Jin_venus08</p>
                        <button className="follow-button">팔로우</button>
                    </div>
                    <img src={picture2} alt="author" className="author-image" />
                </div>
                <div className="thin-line" />
                <div className="comment-input">
                    <textarea
                        placeholder="댓글 작성"
                    />
                </div>
            </div>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-type">
                        <p id="real">이 글을 삭제하시겠습니까?</p>
                        <button onClick={cancelDelete} id="cancel">취소</button>
                        <button onClick={confirmDelete} id="go">삭제</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Post;
