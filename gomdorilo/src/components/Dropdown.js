import React from 'react';
import '../styled_components/Dropdown.css';

const Dropdown = ({ isMenuOpen }) => {
    return (
        isMenuOpen && (
            <div className="dropdown-menu">
                <p className="dropdown-item">내 게시글</p>
                <p className="dropdown-item">임시저장된 글</p>
                <p className="dropdown-item">로그아웃</p>
            </div>
        )
    );
};

export default Dropdown;