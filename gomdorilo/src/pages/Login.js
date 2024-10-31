import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styled_components/SignIn.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const handleSignIn = async () => {
        if (!email || !password) {
            return;
        }

        setError('');
        setLoading(true); 

        try {
            const token = 'token';
            navigate('/main'); 

            const response = await axios.post('https://port-0-b-e-repository-m1qaons0275b16c0.sel4.cloudtype.app/members/sign-in', 
                {
                    email: email,
                    password: password
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('Response data:', response.data);

        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed. Please check your email and password.');
        }
    };

    return (
        <div className="signin-container">
            <div className="signin-box">
                <h2 className="signin-title">Login</h2>
                {error && <div className="error-message">{error}</div>}
                <div className="input-field">
                    <input
                        type="email"
                        className="input"
                        placeholder="이메일 입력"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-field">
                    <input
                        type="password"
                        className="input"
                        placeholder="비밀번호 입력"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="signin-button" onClick={handleSignIn} disabled={loading}>
                    로그인
                </button>
                <button className="signup-button" onClick={() => navigate('/signin')}>
                    회원가입하기
                </button>
            </div>
        </div>
    );
};

export default Login;