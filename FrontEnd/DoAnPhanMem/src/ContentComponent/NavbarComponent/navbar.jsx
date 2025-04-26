import React from 'react'
import "./index.css"
import Logo from "/src/assets/img/logo.png"

const navbar = () => {
  return (
    <div class="content-navbar">
        <div class="profile">
            <img src={Logo} alt="Avatar"/>
            <div class="profile-text">
                <p>Xin chào,</p>
                <h3>Nguyễn Thị Huyền Thương</h3>
            </div>
        </div>
        <div class="menu">
            <a href="#">Thông tin cá nhân</a>
            <a href="#">Quản lý người dùng</a>
            <a href="#">Đăng xuất</a>
        </div>
    </div>
  )
}

export default navbar