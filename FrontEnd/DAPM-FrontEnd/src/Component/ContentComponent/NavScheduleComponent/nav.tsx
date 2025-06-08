import React from 'react';
import './nav.css';
import { Link } from 'react-router-dom';
import Logo from "/src/assets/images/logo.png"
const NavSchedule = () => {
  return (
    <div className="content-navbar">
      <div className="profile">
        <img src={Logo} alt="Avatar" />
        <div className="profile-text">
          <p>Xin chào,</p>
          <h3>Nguyễn Thị Huyền Thương</h3>
        </div>
      </div>
      <div className="menu">
        <Link to="/profile">Thông tin cá nhân</Link>
        <Link to="/schedule">Quản lý lớp thực hành</Link>
        <Link to="/request-approval">Duyệt yêu cầu đổi lịch</Link>
        <Link to="/">Đăng xuất</Link>
      </div>
    </div>
  );
}
export default NavSchedule;