import React, { useEffect, useState } from 'react';
import "./index.css"
import Logo from '../../assets/images/logo.png'
import type { LoginResponse } from 'src/Types/interface'

const index = () => {
    const [user, setUser] = useState<LoginResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const userStr = localStorage.getItem('user');
            if (!userStr) {
                console.error('Không tìm thấy user trong localStorage');
                setLoading(false);
                return;
            }

            try {
                const userObj = JSON.parse(userStr);
                const userId = userObj.id;
                const name = userObj.fullName;
                if (!userId) {
                    console.error('user_id không tồn tại trong dữ liệu user');
                    setLoading(false);
                    return;
                }

                setUser(userObj);
            } catch (error) {
                console.error('Lỗi khi load thông tin người dùng:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="header">
            <div className="container">
                <div className="container-header">
                    <div className="header-left">
                        <ul className="header-list">
                            <li className="header-item">
                                <a className="item-link">
                                    <i className="fa-solid fa-newspaper item-icon"></i>
                                    Tin tức & sự kiện
                                </a>
                            </li>
                            <li className="header-item">
                                <a className="item-link">
                                    <i className="fa-solid fa-bell item-icon"></i>
                                    Thông báo
                                </a>
                            </li>
                            <li className="header-item">
                                <a className="item-link">
                                    <i className="fa-solid fa-folder item-icon"></i>
                                    Văn bản - Biểu mẫu
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="header-right">
                        <ul className="header-list">
                            <li className="header-item">
                                <a className="item-link">
                                    <i className="fa-solid fa-right-to-bracket item-icon"></i>
                                    {loading ? null : user?.full_name || 'Đăng nhập'}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="logo">
                <a href="" className="logo-link">
                    <img src={Logo} alt="" />
                </a>
            </div>
            <div className="navbar">
                <ul className="navbar-list">
                    <li className="navbar-item">
                        <a className="navbar-link">
                            <i className="fa-solid fa-newspaper item-icon"></i>
                            Trang chủ
                        </a>
                    </li>
                    <li className="navbar-item">
                        <a className="navbar-link">
                            Giới Thiệu
                        </a>
                    </li>
                    <li className="navbar-item">
                        <a className="navbar-link">
                            Văn Bản
                        </a>
                    </li>
                    <li className="navbar-item">
                        <a className="navbar-link">
                            Liên Hệ
                        </a>
                    </li>
                    <li className="navbar-item">
                        <a className="navbar-link">
                            Hướng dẫn
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default index