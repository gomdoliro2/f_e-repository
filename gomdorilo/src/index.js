import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Main from './pages/Main.js';
import CreatePost from './pages/CreatePost.js'; 
import Login from './pages/Login.js';
import Post from './pages/Post.js'; 
import SignIn from './pages/SignIn.js'; 
import axios from "axios";

axios.defaults.baseURL = "https://port-0-b-e-repository-m1qaons0275b16c0.sel4.cloudtype.app";
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/main" element={<Main />} /> 
            <Route path="/new-post" element={<CreatePost />} />
            <Route path="/post" element={<Post />} />
            <Route path="/signin" element={<SignIn />} />
        </Routes>
    </Router>
);