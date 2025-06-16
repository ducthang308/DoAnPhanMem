import React from 'react'
import "./index.css"

const index = () => {
    return (
        <div className="footer">
            <div className="container-footer">
                <div className="container-content">
                    <div className="information">
                        <div className="address">
                            <p className="title-text">
                                TRƯỜNG ĐẠI HỌC SƯ PHẠM KỸ THUẬT
                            </p>
                            <ul className="footer-list">
                                <li className="footer-item">
                                    <i className="fa-solid fa-location-dot"></i>
                                    <p className="footer-text"><strong>Cơ sở 1:</strong> 48 Cao Thắng, Thanh Bình, Hải Châu,
                                        Đà Nẵng</p>
                                </li>
                                <li className="footer-item">
                                    <i className="fa-solid fa-location-dot"></i>
                                    <p className="adress-text"><strong>Cơ sở 2:</strong> Khu Đô thị đại học, Hòa Quý,
                                        Ngũ Hành Sơn, Đà
                                        Nẵng</p>
                                </li>
                            </ul>
                        </div>
                        <div className="contact">
                            <p className="title-text">
                                THÔNG TIN LIÊN LẠC
                            </p>
                            <ul className="footer-list">
                                <li className="footer-item">
                                    <i className="fa-solid fa-phone"></i>
                                    <p className="footer-text"><strong>Điện thoại:</strong> 0236 3822 571</p>
                                </li>
                                <li className="footer-item">
                                    <i className="fa-solid fa-envelope"></i>
                                    <p className="adress-text"><strong>Email:</strong> tcntt@ute.udn.vn</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="social">
                        <p className="title-text title-center">
                            KẾT NỐI
                        </p>
                        <ul className="social-list social-circle">
                            <li className="social-item">
                                <a href="#" className="social-network facebook">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                            </li>
                            <li className="social-item">
                                <a href="#" className="social-network youtube">
                                    <i className="fab fa-youtube"></i>
                                </a>
                            </li>
                            <li className="social-item">
                                <a href="#" className="social-network twitter">
                                    <i className="fab fa-twitter"></i>
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