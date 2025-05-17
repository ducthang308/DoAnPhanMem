import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './indexEdit.css';
import type { PracticeScheduleForm, Semester, Teacher } from '../../../Types/PracticeSchedule.ts';

const EditSchedule = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('');

  const [formData, setFormData] = useState<PracticeScheduleForm>({
    classCode: '',
    subject: '',
    date: '2',
    fromPeriod: 1,
    toPeriod: 1,
    effectiveDate: '',
    notes: '',
    semesterId: 0,
    userId: 0,
    roomId: 1,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [scheduleRes, semestersRes, teachersRes] = await Promise.all([
          axios.get(`/api/v1/schedule/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
          axios.get('/api/v1/semesters', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
          axios.get('/api/v1/user/teachers', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
        ]);
        const scheduleData = scheduleRes.data;
        if (scheduleData.effectiveDate) {
        scheduleData.effectiveDate = scheduleData.effectiveDate.split('T')[0]; 
        }
        setFormData(scheduleData);
        setFormData(scheduleRes.data);
        setSemesters(semestersRes.data);
        setTeachers(teachersRes.data);

        // Tìm năm học từ semesterId để set selectedYear
        const currentSemester = semestersRes.data.find((s: Semester) => s.id === scheduleRes.data.semesterId);
        if (currentSemester) {
          setSelectedYear(currentSemester.name);
        }
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu:', err);
        alert('Không thể tải dữ liệu. Kiểm tra đăng nhập hoặc quyền truy cập.');
      }
    };

    fetchData();
  }, [id, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'year') {
      setSelectedYear(value);
      const firstSemester = semesters.find(s => s.name === value);
      setFormData(prev => ({
        ...prev,
        semesterId: firstSemester ? firstSemester.id : 0,
      }));
    } else if (['date', 'fromPeriod', 'toPeriod', 'semesterId', 'userId', 'roomId'].includes(name)) {
      setFormData(prev => ({
        ...prev,
        [name]: parseInt(value),
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`/api/v1/schedule/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      alert('Cập nhật thành công!');
      navigate('/schedule');
    } catch (err) {
      console.error('Lỗi cập nhật:', err);
      alert('Cập nhật thất bại!');
    }
  };

  return (
    <div className="container_schedule">
      <div className="content_schedule">
        <div className="search-bar">
          <input type="text" placeholder="Tìm kiếm" />
        </div>

        <h2>Chỉnh sửa lớp thực hành</h2>

        <div className="form_container">
          <div className="form_wrapper">
            {/* Cột trái */}
            <div className="form_column">
              <div className="form_group">
                <label>Năm học:</label>
                <select name="year" value={selectedYear} onChange={handleChange}>
                  <option value="">-- Chọn năm học --</option>
                  {Array.from(new Set(semesters.map(s => s.name))).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div className="form_group">
                <label>Học kỳ:</label>
                <select name="semesterId" value={formData.semesterId} onChange={handleChange}>
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
                <select name="date" value={formData.date} onChange={handleChange}>
                  {[2, 3, 4, 5, 6, 7].map(d => (
                    <option key={d} value={d}>Thứ {d}</option>
                  ))}
                </select>
              </div>

              <div className="form_group">
                <label>Từ tiết:</label>
                <select name="fromPeriod" value={formData.fromPeriod} onChange={handleChange}>
                  {Array.from({ length: 15 }, (_, i) => i + 1).map(p => (
                    <option key={p} value={p}>Tiết {p}</option>
                  ))}
                </select>
              </div>

              <div className="form_group">
                <label>Đến tiết:</label>
                <select name="toPeriod" value={formData.toPeriod} onChange={handleChange}>
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
                <input type="date" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange} />
              </div>

              <div className="form_group">
                <label>Giảng viên:</label>
                <select name="userId" value={formData.userId} onChange={handleChange}>
                  <option value="">-- Chọn giảng viên --</option>
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>{t.fullName}</option>
                  ))}
                </select>
              </div>

              <div className="form_group">
                <label>Lớp học phần:</label>
                <input type="text" value={formData.classCode} readOnly />
              </div>

              <div className="form_group">
                <label>Tên học phần:</label>
                <input type="text" value={formData.subject} readOnly />
              </div>

              <div className="form_group">
                <label>Ghi chú:</label>
                <input type="text" name="notes" value={formData.notes} onChange={handleChange} />
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

export default EditSchedule;
