import React from 'react';
import { useNavigate } from 'react-router-dom';

const Bar = ({ selectedType, handleTypeClick }) => {
    const navigate = useNavigate();

    const handleCreatePost = () => {
        navigate('/new-post'); 
    };

    return (
        <div className="type">
            <div className="type-item" onClick={() => handleTypeClick('작성일')}>
                <p id="date" style={{ color: selectedType === '작성일' ? '#000' : '#666' }}> 작성일 </p>
                {selectedType === '작성일' && <div className="underline" />}
            </div>
            <div className="type-item" onClick={() => handleTypeClick('인기글')}>
                <p id="fame" style={{ color: selectedType === '인기글' ? '#000' : '#666' }}> 인기글 </p>
                {selectedType === '인기글' && <div className="underline" />}
            </div>
            <div className="type-item" onClick={handleCreatePost}>
                <p id="new-post" style={{ color: '#000' }}> 새 글 작성 </p> 
            </div>
        </div>
    );
};

export default Bar;
