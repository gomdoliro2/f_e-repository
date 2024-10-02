import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; 
import App from './App.js'; 
import CreatePost from './components/CreatePost.js'; 
import { Routes, Route } from 'react-router-dom'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Routes>
            <Route path="/" element={<App />} /> 
            <Route path="/new-post" element={<CreatePost />} /> 
        </Routes>
    </Router>
);
