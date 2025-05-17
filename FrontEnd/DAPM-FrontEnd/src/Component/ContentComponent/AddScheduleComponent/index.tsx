import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './indexAdd.css';
import type { Semester } from '../../../Types/PracticeSchedule.ts';
import { useNavigate } from 'react-router-dom';

const AddSchedule = () => {
  const navigate = useNavigate();
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [formData, setFormData] = useState({
    semesterId: '',
    semesterName: '',
    dayOfWeek: '',
    fromPeriod: '',
    toPeriod: '',
    effectiveDate: '',
    userId: '',
    className: '',
    subjectName: '',
    note: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No token found");
          return;
        }

        const [semestersRes, teachersRes] = await Promise.all([
          axios.get("/api/v1/semesters", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            }
          }),
          axios.get("/api/v1/user/teachers", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            }
          })
        ]);

        setSemesters(semestersRes.data);
        setTeachers(teachersRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'year') {
      setSelectedYear(value);
      setFormData(prev => ({ ...prev, semesterId: '', semesterName: '' }));
    } else if (name === 'semesterId') {
      const selectedSemester = semesters.find(s => s.id.toString() === value);
      setFormData(prev => ({
        ...prev,
        semesterId: value,
        semesterName: selectedSemester?.semesterName || '',
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Bạn chưa đăng nhập.");
        return;
      }

      const postData = {
        classCode: formData.className,
        subject: formData.subjectName,
        date: formData.dayOfWeek,
        fromPeriod: Number(formData.fromPeriod),
        toPeriod: Number(formData.toPeriod),
        effectiveDate: formData.effectiveDate,
        notes: formData.note,
        semesterId: Number(formData.semesterId),
        userId: Number(formData.userId),
        roomId: 1
      };

      await axios.post("/api/v1/schedule/add", postData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      });

      alert("Thêm lịch thực hành thành công!");
      navigate('/schedule');
    } catch (error) {
      console.error("Lỗi khi thêm lịch thực hành:", error);
      alert("Có lỗi xảy ra khi thêm lịch thực hành.");
    }
  };

  return (
    <div className="container_schedule">
      <div className="content_schedule">
        <div className="search-bar">
          <input type="text" placeholder="Tìm kiếm" />
        </div>

        <h2>Thêm lớp thực hành</h2>

        <div className="form_container">
          <div className="form_wrapper">
            {/* Cột trái */}
            <div className="form_column">
              <div className="form_group">
                <label>Năm học:</label>
                <select name="year" onChange={handleChange} value={selectedYear}>
                  <option value="">-- Chọn năm học --</option>
                  {Array.from(new Set(semesters.map(s => s.name))).map((yearName) => (
                    <option key={yearName} value={yearName}>{yearName}</option>
                  ))}
                </select>
              </div>

              <div className="form_group">
                <label>Học kỳ:</label>
                <select name="semesterId" onChange={handleChange} value={formData.semesterId}>
                  <option value="">-- Chọn học kỳ --</option>
                  {semesters
                    .filter(s => s.name === selectedYear)
                    .map(s => (
                      <option key={s.id} value={s.id}>{s.semesterName}</option>
                    ))}
                </select>
              </div>

              <div className="form_group">
                <label>Thứ:</label>
                <select name="dayOfWeek" onChange={handleChange}>
                  <option value="">-- Chọn thứ --</option>
                  {[2, 3, 4, 5, 6, 7].map(day => (
                    <option key={day} value={day}>Thứ {day}</option>
                  ))}
                </select>
              </div>

              <div className="form_group">
                <label>Từ tiết:</label>
                <select name="fromPeriod" onChange={handleChange}>
                  <option value="">-- Chọn tiết bắt đầu --</option>
                  {Array.from({ length: 15 }, (_, i) => i + 1).map(p => (
                    <option key={p} value={p}>Tiết {p}</option>
                  ))}
                </select>
              </div>

              <div className="form_group">
                <label>Đến tiết:</label>
                <select name="toPeriod" onChange={handleChange}>
                  <option value="">-- Chọn tiết kết thúc --</option>
                  {Array.from({ length: 15 }, (_, i) => i + 1).map(p => (
                    <option key={p} value={p}>Tiết {p}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Cột phải */}
            <div className="form_column">
              <div className="form_group">
                <label>Ngày hiệu lực:</label>
                <input type="date" name="effectiveDate" onChange={handleChange} />
              </div>

              <div className="form_group">
                <label>Giảng viên:</label>
                <select name="userId" onChange={handleChange}>
                  <option value="">-- Chọn giảng viên --</option>
                  {teachers.map((t: any) => (
                    <option key={t.id} value={t.id}>{t.fullName}</option>
                  ))}
                </select>
              </div>

              <div className="form_group">
                <label>Lớp học phần:</label>
                <input type="text" name="className" onChange={handleChange} placeholder="Nhập lớp học phần" />
              </div>

              <div className="form_group">
                <label>Tên học phần:</label>
                <input type="text" name="subjectName" onChange={handleChange} placeholder="Nhập tên học phần" />
              </div>

              <div className="form_group">
                <label>Ghi chú:</label>
                <input type="text" name="note" onChange={handleChange} placeholder="Nhập ghi chú" />
              </div>
            </div>
          </div>

          <div className="form-submit">
            <button className="save-btn" onClick={handleSubmit}>Lưu</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSchedule;
