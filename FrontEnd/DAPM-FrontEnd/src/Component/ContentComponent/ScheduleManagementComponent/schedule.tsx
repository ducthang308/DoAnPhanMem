import React, { useState, useEffect } from 'react';
import "./index.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface ScheduleItem {
    id: number;
    day: number;
    week: number;
    partDay: string;
    semesterId: number;
    semesterName: string;
    year: string;
    userId: number;
    username: string;
}

interface Semester {
    id: number;
    semesterName: string;
    startYear: number;
    endYear: number;
}

const Schedule = () => {
    const navigate = useNavigate();
    const handleUpdate = (scheduleData: ScheduleItem[]) => {
        navigate('/it-officer/duty_schedule/update-schedule', { state: { scheduleData, semesterId, tuan } });
    };
    const [semesterList, setSemesterList] = useState<Semester[]>([]);
    const [semesterId, setSemesterId] = useState<number | null>(null);
    const [tuan, setTuan] = useState(1);
    const [scheduleData, setScheduleData] = useState<ScheduleItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];
    const API_BASE_URL = 'http://localhost:8080/api/v1/duty_schedule';

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        fetchSemesters(token);
    }, [navigate]);

    const fetchSemesters = async (token: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_BASE_URL}/semesters`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSemesterList(response.data);
            if (response.data.length > 0) {
                setSemesterId(response.data[0].id);
            }
        } catch (error) {
            setError('Không thể tải danh sách học kỳ. Vui lòng thử lại.');
            console.error("Lỗi khi lấy danh sách semester:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchScheduleData = async () => {
        if (!semesterId) return;
        const semester = semesterList.find(s => s.id === semesterId);
        if (!semester) return;
        setIsLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }
            const response = await axios.get(`${API_BASE_URL}/filter`, {
                params: { semesterName: semester.semesterName, week: tuan },
                headers: { Authorization: `Bearer ${token}` }
            });
            setScheduleData(response.data);
        } catch (error) {
            setError('Không thể tải lịch trực. Vui lòng thử lại.');
            console.error("Lỗi khi gọi API:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (semesterId && semesterList.length > 0) {
            fetchScheduleData();
        }
    }, [semesterId, tuan, semesterList]);

    const renderUser = (dayLabel: string, partDay: string) => {
        const dayIndex = days.indexOf(dayLabel) + 2;
        const found = scheduleData.find(item => item.day === dayIndex && item.partDay === partDay);
        return found ? found.username : '';
    };

    const renderTuanOptions = () => {
        return Array.from({ length: 20 }, (_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
        ));
    };

    return (
        <div className="content-main">
            <div className="schedule-wrapper">
                <h2>Quản lý lịch trực</h2>
                <div className="filters">
                    <h3>Học kỳ:</h3>
                    <select value={semesterId || ''} onChange={(e) => setSemesterId(Number(e.target.value))}>
                        <option value="" disabled>Chọn học kỳ</option>
                        {semesterList.map(semester => (
                            <option key={semester.id} value={semester.id}>
                                {semester.semesterName}
                            </option>
                        ))}
                    </select>
                    <h3>Tuần:</h3>
                    <select value={tuan} onChange={(e) => setTuan(Number(e.target.value))}>
                        {renderTuanOptions()}
                    </select>
                </div>
            </div>

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Ngày</th>
                            <th>Buổi sáng</th>
                            <th>Buổi chiều</th>
                            <th>Ghi chú</th>
                        </tr>
                    </thead>
                    <tbody>
                        {days.map((ngay, index) => (
                            <tr key={index}>
                                <td><b>{ngay}</b></td>
                                <td>{renderUser(ngay, "Sáng")}</td>
                                <td>{renderUser(ngay, "Chiều")}</td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="center">
                <button className="btn-update" onClick={() => handleUpdate(scheduleData)}>Cập nhật</button>
            </div>
        </div>
    );
};

export default Schedule;