import React from 'react';
import './indexAdd.css';

const AddSchedule = () => {
    return(
            <div className="container_schedule">
              {/* Sidebar */}
              <div className="sidebar">
                <div className="profile">
                  <img src="/avatar.jpg" alt="avatar" />
                  <p>Xin chào,</p>
                  <h4>Nguyễn Thị Huyền Thương</h4>
                </div>
                <div className="menu">
                  <button>Thông tin cá nhân</button>
                  <button>Quản lý lớp thực hành</button>
                  <button>Duyệt yêu cầu đổi lịch</button>
                  <button>Đăng xuất</button>
                </div>
              </div>
        
              {/* Content */}
              <div className="content">
                {/* Search Bar */}
                <div className="search-bar">
                  <input type="text" placeholder="Tìm kiếm" />
                </div>
        
                {/* Header */}
                <h2>Thêm lớp thực hành</h2>

                <div className="form_container">
                    <div className="form_wrapper">

                        {/* Cột trái */}
                        <div className="form_column">
                        <div className="form_group">
                            <label>Năm học:</label>
                            <select>
                            <option>2024 - 2025</option>
                            </select>
                        </div>

                        <div className="form_group">
                            <label>Học kỳ:</label>
                            <select>
                            <option>224</option>
                            </select>
                        </div>

                        <div className="form_group">
                            <label>Thứ:</label>
                            <select>
                            <option>224</option>
                            </select>
                        </div>

                        <div className="form_group">
                            <label>Từ tiết:</label>
                            <select>
                            <option>224</option>
                            </select>
                        </div>

                        <div className="form_group">
                            <label>Đến tiết:</label>
                            <select>
                            <option>224</option>
                            </select>
                        </div>
                        </div>

                        {/* Cột phải */}
                        <div className="form_column1">
                        <div className="form_group">
                            <label>Ngày hiệu lực:</label>
                            <input type="date" />
                        </div>

                        <div className="form_group">
                            <label>Giảng viên:</label>
                            <select>
                            <option>Huỳnh Nhật Nam</option>
                            </select>
                        </div>

                        <div className="form_group">
                            <label>Lớp học phần:</label>
                            <input type="text" placeholder="Nhập lớp học phần" />
                        </div>

                        <div className="form_group">
                            <label>Tên học phần:</label>
                            <input type="text" placeholder="Nhập tên học phần" />
                        </div>

                        <div className="form_group">
                            <label>Ghi chú:</label>
                            <input type="text" placeholder="Nhập ghi chú" />
                        </div>
                        </div>
                    </div>
                    <div className="form-submit">
                        <button className="save-btn">Lưu</button>
                    </div>
                    </div>

            </div>
            </div>
    );
}
export default AddSchedule;