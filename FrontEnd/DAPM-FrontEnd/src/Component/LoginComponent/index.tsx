import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../Services/LoginServices';
import Header from '../HeaderComponent'
import Footer from '../FooterComponent'
import "./index.css"

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = await login(email, password);
            console.log(data);
            localStorage.setItem('token', data.token);
            localStorage.setItem("user", JSON.stringify(data));
            if (data.roles_id === 1) {
                navigate('/home');
            } else if (data.roles_id === 2) {
                navigate('/training');
            } else {
                alert("Vai trò không hợp lệ");
            }
        } catch (error) {
            alert('Sai tài khoản hoặc lỗi hệ thống');
        }
    };

    return (
        <>
            <Header></Header>
            <div className="login">
                <div className="form-wrapper">
                    <p className="form-text">Hệ thống Quản Lý Lịch Thực Hành & Phòng Máy Tính</p>
                    <form className="contact-form" onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="email">Username</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group remember-me">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Ghi nhớ tài khoản</label>
                        </div>
                        <button type="submit" className="submit-btn">Đăng nhập</button>
                    </form>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
};

export default LoginForm;
