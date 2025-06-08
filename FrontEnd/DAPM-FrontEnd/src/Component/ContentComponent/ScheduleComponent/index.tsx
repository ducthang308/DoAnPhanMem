import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';
import NavSchedule from "../NavScheduleComponent/nav.js";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import type { PracticeSchedule } from '../../../Types/PracticeSchedule.ts';
import type { SemesterFilter } from '../../../Types/SemesterFilter.ts';
const Schedule = () => {
  const [schedules, setSchedules] = useState<PracticeSchedule[]>([]);
  const navigate = useNavigate();
  const handleAddClick = () => {
    navigate('/schedule/addschedule');
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa lịch này?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`/api/v1/schedule/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Cập nhật lại danh sách sau khi xóa
        setSchedules(prevSchedules => prevSchedules.filter(schedule => schedule.id !== id));
      } catch (error) {
        console.error("Lỗi khi xóa lịch:", error);
        alert("Không thể xóa lịch. Vui lòng thử lại.");
      }
    }
  };

  const [filterOptions, setFilterOptions] = useState<SemesterFilter[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedSemester, setSelectedSemester] = useState<string>('');

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/v1/schedule", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setSchedules(response.data);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };
    fetchSchedules();
  }, []);

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/v1/semesters", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const mapped = response.data.map((sem: any) => ({
          academicYear: sem.name,
          semesterName: sem.semesterName,
        }));

        setFilterOptions(mapped);
      } catch (error) {
        console.error("Error fetching semesters:", error);
      }
    };

    fetchSemesters();
  }, []);

  useEffect(() => {
    setSelectedSemester("");
  }, [selectedYear]);

  useEffect(() => {
    if (!selectedYear.includes('-') || !selectedSemester) return;

    const [startYear, endYear] = selectedYear.split('-').map(Number);
    if (isNaN(startYear) || isNaN(endYear)) return;

    const fetchFilteredSchedules = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/v1/schedule/filter", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            semesterName: selectedSemester,
            startYear,
            endYear,
          },
        });

        setSchedules(response.data);
      } catch (error) {
        console.error("Error fetching filtered schedules:", error);
      }
    };

    fetchFilteredSchedules();
  }, [selectedYear, selectedSemester]);

  return (
    <div className="container_schedule">
      {/* Content */}
      <div className="content_schedule">
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
            <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
              <option value="" disabled>Chọn năm học</option>
              {[...new Set(filterOptions.map(opt => opt.academicYear))].map((year, index) => (
                <option key={index} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Học kỳ: </label>
            <select value={selectedSemester} onChange={e => setSelectedSemester(e.target.value)} disabled={!selectedYear}>
              <option value="" disabled>Chọn học kỳ</option>
              {[...new Set(
                filterOptions
                  .filter(opt => opt.academicYear === selectedYear)
                  .map(opt => opt.semesterName)
              )].map((sem, index) => (
                <option key={index} value={sem}>{sem}</option>
              ))}
            </select>

          </div>
        </div>

        {/* Add Schedule Button */}
        <button className="add-button" onClick={handleAddClick}>+ Thêm lịch</button>

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
            {schedules.map((item, index) => (
              <tr key={index}>
                <td>{item.classCode}</td>
                <td>{item.subject}</td>
                <td>{item.date}</td>
                <td>{item.fromPeriod}</td>
                <td>{item.toPeriod}</td>
                <td>{item.users?.fullName}</td>
                <td>{item.room?.roomName}</td>
                <td>{new Date(item.effectiveDate).toLocaleDateString('vi-VN')}</td>
                <td>{item.notes || "-"}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/schedule/editschedule/${item.id}`)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#FFD43B" }} />
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(item.id)}>
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
}
export default Schedule;


