import React from 'react'
import "./index.css"
import Logo from "../../../assets/images/logo.png"

const navbar = () => {
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
                <a href="#">Thông tin cá nhân</a>
                <a href="#">Quản lý người dùng</a>
                <a href="#">Đăng xuất</a>
            </div>
        </div>
    )
}

export default navbar