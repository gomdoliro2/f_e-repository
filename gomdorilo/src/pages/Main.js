import React, { useEffect, useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Dropdown.js';
import Bar from '../components/Bar.js';
import CreatePost from './CreatePost.js';
import '../styled_components/Main.css';

function Main() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedType, setSelectedType] = useState('작성일');
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`/board`);
                setPosts(response.data);
                setFilteredPosts(response.data);
            } catch (err) {
                console.error('게시물 가져오기 실패:', err);
            }
        };

        fetchPosts();
    }, []);

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
        setPosts(prevPosts => [...prevPosts, newPost]);
        setFilteredPosts(prevPosts => [...prevPosts, newPost]);
    };

    const handlePostSelect = async (postId) => {
        navigate(`/post/${postId}`);
    };

    const NewPostButton = () => (
        <button className="new-post-button" onClick={() => navigate('/new-post')}>새 글 작성</button>
    );

    return (
        <div className="main-container">
            <Header 
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
            <div className="line" />
            <table className="post-table">
                <thead>
                    <tr>
                            <th>no</th>
                            <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>추천</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post, index) => (
                            <tr key={post.id} onClick={() => handlePostSelect(post.id)}>
                                <td>{index + 1}</td>
                                <td>{post.title}</td>
                                <td>{post.username || '익명'}</td> 
                                <td>{new Date(post.createdAt).toLocaleDateString()}</td> 
                                <td>{post.recommendations || 0}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">게시물이 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Routes>
                <Route path="/new-post" element={<CreatePost onPostSubmit={handlePostSubmit} />} />
            </Routes>
        </div>
    );
}

export default Main;
