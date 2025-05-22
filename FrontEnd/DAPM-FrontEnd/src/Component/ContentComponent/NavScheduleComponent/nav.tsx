import React from 'react';
import './nav.css';
import Logo from "/src/assets/images/logo.png"
const NavSchedule = () => {
  return (
    <div className="content-navbar">
        <div className="profile">
            <img src={Logo} alt="Avatar"/>
            <div className="profile-text">
                <p>Xin chào,</p>
                <h3>Nguyễn Thị Huyền Thương</h3>
            </div>
        </div>
        <div className="menu">
            <a href="#">Thông tin cá nhân</a>
            <a href="#">Quản lý lớp thực hành</a>
            <a href="#">Duyệt yêu cầu đổi lịch</a>
            <a href="#">Đăng xuất</a>
        </div>
    </div>
  )
}
export default NavSchedule;