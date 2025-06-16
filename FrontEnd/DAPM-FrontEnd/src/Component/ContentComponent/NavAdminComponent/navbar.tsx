import React, { useEffect, useState } from 'react';
import type { LoginResponse } from 'src/Types/interface'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./index.css"
import Logo from "../../../assets/images/logo.png"

const navbar = () => {
    const [user, setUser] = useState<LoginResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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

    const handleLogout = () => {
        localStorage.removeItem('user');      // Xóa user
        setUser(null);                        // Reset state
        navigate("/", { replace: true });     // Điều hướng, không cho quay lại
    };

    return (
        <div className="content-navbar">
            <div className="profile">
                <img src={Logo} alt="Avatar" />
                <div className="profile-text">
                    <p>Xin chào,</p>
                    <h3>{loading ? null : user?.full_name || 'Không hiển thị'}</h3>
                </div>
            </div>
            <div className="menu">
                <nav>
                    <Link to="/profile">Thông tin cá nhân</Link>
                    {/* <Link to="/it-officer/duty_schedule/schedule">Quản lý lịch trực</Link> */}
                    {/* <Link to="/duty_schedule/room">Quản lý sơ đồ phòng thực hành</Link> */}
                    {/* <Link to="/it-officer/computers/">Quản lý máy tính</Link> */}
                    {/* <Link to="/it-officer/room-class/">Cập nhật phòng Lớp học phần</Link> */}
                    <a onClick={handleLogout} style={{ cursor: 'pointer' }}>Đăng xuất</a>
                </nav>
            </div>
        </div>
    )
}

export default navbar