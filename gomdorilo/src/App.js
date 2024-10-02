import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header.js';
import Bar from './components/Bar.js'; 
import PostTable from './components/PostTable.js';
import { useNavigate } from 'react-router-dom';

function App() {
    const [data, setData] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const [username] = useState('Jin_venus08'); 
    const [searchTerm, setSearchTerm] = useState(''); 
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    const [selectedType, setSelectedType] = useState('작성일'); 
    const [filteredPosts, setFilteredPosts] = useState([]); 

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://port-0-b-e-repository-m1qaons0275b16c0.sel4.cloudtype.app');
                if (!response.ok) {
                    throw new Error('네트워크 응답이 정상적이지 않습니다.');
                }
                const result = await response.json();
                setData(result);
                setFilteredPosts(result); 
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNewPostClick = () => {
        navigate('/new-post'); 
    };

    const handleSearch = () => {
        if (!data) return;
        const results = data.filter(post => post.title.includes(searchTerm));
        setFilteredPosts(results);
    };

    const handleTypeClick = (type) => {
        setSelectedType(type);
        if (type === '작성일') {
            setFilteredPosts([...data].sort((a, b) => new Date(b.date) - new Date(a.date)));
        } else if (type === '인기글') {
            setFilteredPosts([...data].sort((a, b) => b.recommendations - a.recommendations));
        } else {
            setFilteredPosts(data);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

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
            <button className="new" onClick={handleNewPostClick}>새 글 작성</button>
            <div className="line"></div>
            <PostTable filteredPosts={filteredPosts} />
        </div>
    );
}

export default App;
