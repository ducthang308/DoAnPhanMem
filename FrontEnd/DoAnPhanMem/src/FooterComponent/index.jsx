import React from 'react'
import "./index.css"

const index = () => {
  return (
    <div class="footer">
        <div class="container-footer">
            <div class="container-content">
                <div class="information">
                    <div class="address">
                        <p class="title">
                            TRƯỜNG ĐẠI HỌC SƯ PHẠM KỸ THUẬT
                        </p>
                        <ul class="footer-list">
                            <li class="footer-item">
                                <i class="fa-solid fa-location-dot"></i>
                                <p class="footer-text"><strong>Cơ sở 1:</strong> 48 Cao Thắng, Thanh Bình, Hải Châu,
                                    Đà Nẵng</p>
                            </li>
                            <li class="footer-item">
                                <i class="fa-solid fa-location-dot"></i>
                                <p class="adress-text"><strong>Cơ sở 2:</strong> Khu Đô thị đại học, Hòa Quý,
                                    Ngũ Hành Sơn, Đà
                                    Nẵng</p>
                            </li>
                        </ul>
                    </div>
                    <div class="contact">
                        <p class="title">
                            THÔNG TIN LIÊN LẠC
                        </p>
                        <ul class="footer-list">
                            <li class="footer-item">
                                <i class="fa-solid fa-phone"></i>
                                <p class="footer-text"><strong>Điện thoại:</strong> 0236 3822 571</p>
                            </li>
                            <li class="footer-item">
                                <i class="fa-solid fa-envelope"></i>
                                <p class="adress-text"><strong>Email:</strong> tcntt@ute.udn.vn</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="social">
                    <p class="title title-center">
                        KẾT NỐI
                    </p>
                    <ul class="social-list social-circle">
                        <li class="social-item">
                            <a href="#" class="social-network facebook">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                        </li>
                        <li class="social-item">
                            <a href="#" class="social-network youtube">
                                <i class="fab fa-youtube"></i>
                            </a>
                        </li>
                        <li class="social-item">
                            <a href="#" class="social-network twitter">
                                <i class="fab fa-twitter"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>  
  )
}

export default index