import React from 'react'
import { Link } from 'react-router-dom';
import "./index.css"
import Logo from "../../../assets/images/logo.png"

const navbar = () => {
    return (
        <div className="content-navbar">
            <div className="profile">
                <img src={Logo} alt="Avatar" />
                <div className="profile-text">
                    <p>Xin chào,</p>
                    <h3>Trương Như Quang Thảo</h3>
                </div>
            </div>
            <div className="menu">
                <nav>
                    <Link to="/profile">Thông tin cá nhân</Link>
                    <Link to="/it-officer/duty_schedule/schedule">Quản lý lịch trực</Link>
                    {/* <Link to="/duty_schedule/room">Quản lý sơ đồ phòng thực hành</Link> */}
                    <Link to="/it-officer/computers/">Quản lý máy tính</Link>
                    <Link to="/">Đăng xuất</Link>
                </nav>
            </div>
        </div>
    )
}

export default navbar