import React from 'react';
import picture1 from '../img/material-symbols_search.png';
import picture2 from '../img/frame.png';

const Header = ({ username, searchTerm, setSearchTerm, handleSearch, isMenuOpen, toggleMenu }) => {
    return (
        <div className="header">
            <div className="logo">
                <p>BamGallary</p>
            </div>
            <div className="search">
                <input
                    id="search-bar"
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)} 
                />
                <img src={picture1} alt="search-symbol" className="search-icon" onClick={handleSearch} />
            </div>
            <div className="mypost" onClick={toggleMenu}>
                <p>내 게시물 <span> | </span> {username} </p>
                <img src={picture2} alt="face-symbol" className="face-icon" />
            </div>
            {isMenuOpen && (
                <div className="dropdown-menu">
                    <ul>
                        <li>내 정보</li>
                        <li>내 게시글</li>
                        <li>임시 저장</li>
                        <li>로그아웃</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Header;
