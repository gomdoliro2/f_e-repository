import React, { useState } from 'react';
import './App.css';
import Header from './components/Header.js';
import Bar from './components/Bar.js';
import PostTable from './components/PostTable.js';
import { useNavigate } from 'react-router-dom';
import CreatePost from './components/CreatePost.js';
import { Routes, Route } from 'react-router-dom';

function App() {
    const [username] = useState('Jin_venus08');
    const [searchTerm, setSearchTerm] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedType, setSelectedType] = useState('작성일');

    const initialPosts = [
        { no: 120, title: '카페인, 얼마나 도움이 될까?', author: '몬스터에너지', date: '2024.10.01', recommendations: 13 },
        { no: 114, title: '내가 엄준식을 찬양하게 된 이유', author: '기술숭배', date: '2024.10.01', recommendations: 2 },
        { no: 113, title: '엄준식, 요새 뭐하고 살고 있나?', author: '상시숭배', date: '2024.09.30', recommendations: 1 },
        { no: 112, title: '기숙사에서 누가 라면을 먹었는가', author: '농심', date: '2024.09.30', recommendations: 5 },
        { no: 111, title: '몬스터에너지 가격인상, 어디까지 오를까?', author: '사장님돈주세요', date: '2024.09.30', recommendations: 8 },
        { no: 110, title: '다 갈아엎은 썰 푼다', author: '싸개', date: '2024.09.29', recommendations: 10 },
        { no: 109, title: '하늘로 돌아간 외국 유명 가수들', author: '힘찔좌', date: '2024.09.28', recommendations: 11 },
        { no: 108, title: '노이즈캔슬링, 정말 장점만 있을까?', author: '안들려요', date: '2024.09.28', recommendations: 3 },
        { no: 107, title: '나 오늘 못잔다.', author: '과제', date: '2024.09.27', recommendations: 12 },
        { no: 106, title: '카페인 과다복용 부작용 정리', author: '졸린청년', date: '2024.09.27', recommendations: 10 },
        { no: 105, title: '우리 끝은 치킨집일까', author: 'Chris.P', date: '2024.09.27', recommendations: 21 },
    ];

    const [filteredPosts, setFilteredPosts] = useState(initialPosts);
    const [posts, setPosts] = useState(initialPosts);

    const handleSearch = () => {
        const results = posts.filter(post => post.title.includes(searchTerm));
        setFilteredPosts(results);
    };

    const handleTypeClick = (type) => {
        setSelectedType(type);
        if (type === '작성일') {
            setFilteredPosts([...posts].sort((a, b) => new Date(b.date) - new Date(a.date)));
        } else if (type === '인기글') {
            setFilteredPosts([...posts].sort((a, b) => b.recommendations - a.recommendations));
        } else {
            setFilteredPosts(posts);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handlePostSubmit = (newPost) => {
        setPosts([...posts, newPost]); 
        setFilteredPosts([...posts, newPost]);
    };

    return (
        <div className="container">
            <Header 
                username={username} 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
                handleSearch={handleSearch} 
                isMenuOpen={isMenuOpen} 
                toggleMenu={toggleMenu} 
            />
            <Bar 
                selectedType={selectedType} 
                handleTypeClick={handleTypeClick} 
            />
            <NewPostButton />
            <div className="line"></div>
            <PostTable filteredPosts={filteredPosts} />
            <Routes>
                <Route path="/new-post" element={<CreatePost onPostSubmit={handlePostSubmit} />} />
            </Routes>
        </div>
    );
}

const NewPostButton = () => {
    const navigate = useNavigate();
    return (
        <button className="new" onClick={() => navigate('/new-post')}>새 글 작성</button>
    );
};

export default App;