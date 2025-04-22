import React from 'react'
import "./index.css"

const index = () => {
  return (
    <div class="login">
        <div class="form-wrapper">
            <p class="form-text">Hệ thống Quản Lý Lịch Thực Hành & Phòng Máy Tính</p>
            <form class="contact-form">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" placeholder="Username"/>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" placeholder="Password"/>
                </div>
                <div class="form-group remember-me">
                    <input type="checkbox" id="remember"/>
                    <label for="remember">Ghi nhớ tài khoản</label>
                </div>
                <button type="submit" class="submit-btn">Đăng nhập</button>
            </form>
        </div>
    </div>
  )
}

export default index