import React, { useState } from 'react';
import axios from 'axios';
import '../styled_components/SignIn.css'; 
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [nicknameStatus, setNicknameStatus] = useState('닉네임을 입력하세요.');
    const [isNicknameVisible, setIsNicknameVisible] = useState(false);
    const navigate = useNavigate();

    const usedNicknames = ['Jin_venus08', 'JohnDoe', '홍길동'];

    const handleNicknameChange = (e) => {
        const newNickname = e.target.value;
        setNickname(newNickname);

        if (!newNickname.trim()) {
            setNicknameStatus('닉네임을 입력하세요.');
        } else if (usedNicknames.includes(newNickname)) {
            setNicknameStatus('이미 사용중인 닉네임입니다.');
        } else {
            setNicknameStatus('사용 가능한 닉네임입니다.');
        }
    };

    const handleSignUp = async () => {
        setErrorMessage('');
        setSuccessMessage('');

        if (!email || !password) {
            return;
        }

        if (isNicknameVisible && !nickname) {
            return;
        }

        if (!isNicknameVisible) {
            setIsNicknameVisible(true);
            return;
        }

        if (nicknameStatus !== '사용 가능한 닉네임입니다.') {
            return;
        }

        try {
            const response = await axios.post('https://port-0-b-e-repository-m1qaons0275b16c0.sel4.cloudtype.app/members/sign-up', {
                email,
                password,
                nickname
            });

            localStorage.setItem('username', nickname);
            const token = response.data.token;
            localStorage.setItem('token', token);
            navigate('/');
        } catch (error) {
            setErrorMessage((error.response?.data?.message));
            console.error('회원가입 실패:', error);
        }
    };

    const handleSignIn = () => {
        navigate('/');
    };

    return (
        <div className="signin-container">
            <div className="signin-box">
                <h2 className="signin-title">Sign up</h2>

                {!isNicknameVisible && (
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
                )}

                {!isNicknameVisible && (
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
                )}

                {isNicknameVisible && (
                    <div className="input-field" id="nick">
                        <input
                            type="text"
                            className="input"
                            placeholder="닉네임 입력"
                            value={nickname}
                            onChange={handleNicknameChange}
                            required
                        />
                        <div
                            className="nickname-status"
                            style={{
                                color: nicknameStatus === '이미 사용중인 닉네임입니다.' ? '#ff1f1f' : nicknameStatus === '사용 가능한 닉네임입니다.' ? '#1F8BFF' : '#B3B3B3',
                                marginTop: '5px'
                            }}
                        >
                            {nicknameStatus}
                        </div>
                    </div>
                )}

                {errorMessage && (
                    <div className="error-message">
                        {errorMessage}
                    </div>
                )}

                {successMessage && (
                    <div className="success-message">
                        {successMessage}
                    </div>
                )}

                <button className="signin-button" onClick={handleSignUp}>
                    회원가입
                </button>

                <button className="signup-button" onClick={handleSignIn}>로그인하기</button>
            </div>
        </div>
    );
};

export default SignIn;