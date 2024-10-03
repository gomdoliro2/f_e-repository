import React from 'react';
import { useLocation } from 'react-router-dom'; 
import picture2 from '../img/frame.png';

const Post = () => {
    const location = useLocation();
    const { title, content} = location.state || {};

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
            <div className="post-content">
                <h1>{title}</h1> 
                <p>{content}</p>
            </div>
        </div>
    );
};

export default Post;
