import React from 'react';
import './index.css';
import NavSchedule from "./NavScheduleComponent/nav.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
const Schedule = () => {
  return (
    <div className="container_schedule">
      {/* Sidebar */}
      <NavSchedule></NavSchedule>

      {/* Content */}
      <div className="content">
        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="Tìm kiếm" />
        </div>

        {/* Header */}
        <h2>Danh sách lớp thực hành</h2>

        {/* Filters */}
        <div className="filters">
          <div>
            <label>Năm học: </label>
            <select>
              <option>2024 - 2025</option>
            </select>
          </div>
          <div>
            <label>Học kỳ: </label>
            <select>
              <option>224</option>
            </select>
          </div>
        </div>

        {/* Add Schedule Button */}
        <button className="add-button">+ Thêm lịch</button>

        {/* Table */}
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Lớp</th>
              <th>Tên học phần</th>
              <th>Thứ</th>
              <th>Từ tiết</th>
              <th>Đến tiết</th>
              <th>Giảng viên</th>
              <th>Phòng</th>
              <th>Ngày hiệu lực</th>
              <th>Ghi chú</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_, index) => (
              <tr key={index}>
                <td>2241LTC#01</td>
                <td>TH Lập trình C#</td>
                <td>2</td>
                <td>1</td>
                <td>2</td>
                <td>Huỳnh Nhật Nam</td>
                <td>{index < 2 ? "PMT" : "B201"}</td>
                <td>03/02/2025</td>
                <td>-</td>
                <td>
                <button className="edit-btn">
                    <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#FFD43B" }} />
                </button>
                <button className="delete-btn">
                    <FontAwesomeIcon icon={faTrash} style={{ color: "#FF5C5C" }} />
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schedule;
