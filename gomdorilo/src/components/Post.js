import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import picture2 from '../img/frame.png';

const Post = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { title = '', content = '' } = location.state || {};

    const [titleState] = useState(title);
    const [contentState] = useState(content);

    const handleEdit = () => {
        navigate('/new-post', {
            state: { title: titleState, content: contentState },
        });
    };

    const handleDelete = () => {
        navigate('/');
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
                <div className="show">
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
                </div>
                <div className="thin-line" />
            </div>
        </div>
    );
    
}    

export default Post;
