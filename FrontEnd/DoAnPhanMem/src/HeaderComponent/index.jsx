import React from 'react'
import "./index.css"

const index = () => {
  return (
    <div class="header">
        <div class="container">
            <div class="container-header">
                <div class="header-left">
                    <ul class="header-list">
                        <li class="header-item">
                            <a class="item-link">
                                <i class="fa-solid fa-newspaper item-icon"></i>
                                Tin tức & sự kiện
                            </a>
                        </li>
                        <li class="header-item">
                            <a class="item-link">
                                <i class="fa-solid fa-bell item-icon"></i>
                                Thông báo
                            </a>
                        </li>
                        <li class="header-item">
                            <a class="item-link">
                                <i class="fa-solid fa-folder item-icon"></i>
                                Văn bản - Biểu mẫu
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="header-right">
                    <ul class="header-list">
                        <li class="header-item">
                            <a class="item-link">
                                <i class="fa-solid fa-right-to-bracket item-icon"></i>
                                Đăng nhập
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="logo">
            <a href="" class="logo-link">
                <img src="/src/assets/img/logo.png" alt=""/>
            </a>
        </div>
        <div class="navbar">
            <ul class="navbar-list">
                <li class="navbar-item">
                    <a class="navbar-link">
                        <i class="fa-solid fa-newspaper item-icon"></i>
                        Trang chủ
                    </a>
                </li>
                <li class="navbar-item">
                    <a class="navbar-link">
                        Giới Thiệu
                    </a>
                </li>
                <li class="navbar-item">
                    <a class="navbar-link">
                        Văn Bản
                    </a>
                </li>
                <li class="navbar-item">
                    <a class="navbar-link">
                        Liên Hệ
                    </a>
                </li>
                <li class="navbar-item">
                    <a class="navbar-link">
                        Hướng dẫn
                    </a>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default index