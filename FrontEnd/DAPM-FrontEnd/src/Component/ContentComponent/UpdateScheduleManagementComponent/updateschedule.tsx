import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./index.css";

interface ScheduleItem {
    id: number;
    week: number;
    day: number;
    partDay: string;
    semesterId: number;
    semesterName: string;
    userId: number;
    username: string;
}

interface Officer {
    id: number;
    fullname: string;
}

interface Semester {
    id: number;
    semesterName: string;
    startYear: number;
    endYear: number;
}

const UpdateSchedule: React.FC = () => {
    const API_BASE_URL = 'http://localhost:8088/api/v1/duty_schedule';
    const location = useLocation();
    const state = location.state as { scheduleData: ScheduleItem[], semesterId: number, tuan: number } | undefined;
    const [scheduleData, setScheduleData] = useState<ScheduleItem[]>([]);
    const [semesterId, setSemesterId] = useState<number>(0);
    const [tuan, setTuan] = useState<number>(1);
    const [semesterList, setSemesterList] = useState<Semester[]>([]);
    const [officers, setOfficers] = useState<Officer[]>([]);
    const navigate = useNavigate();

    const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];

    useEffect(() => {
        if (!state) return;

        const fullSchedule: ScheduleItem[] = [];

        for (let i = 0; i < days.length; i++) {
            const day = i + 2;

            ['Sáng', 'Chiều'].forEach(part => {
                const existing = state.scheduleData.find(
                    item => item.day === day && item.partDay === part
                );

                fullSchedule.push(existing ?? {
                    id: 0,
                    day,
                    week: state.tuan,
                    semesterId: state.semesterId,
                    semesterName: '',
                    userId: 0,
                    username: '',
                    partDay: part
                });
            });
        }

        setScheduleData(fullSchedule);
        setSemesterId(state.semesterId);
        setTuan(state.tuan);
    }, [state]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("Bạn chưa đăng nhập");
                return;
            }

            try {
                const [officersRes, semestersRes] = await Promise.all([
                    axios.get(`${API_BASE_URL}/it_officers`, {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get(`${API_BASE_URL}/semesters`, {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                ]);

                setOfficers(officersRes.data);
                setSemesterList(semestersRes.data);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
                alert("Không thể tải dữ liệu. Vui lòng thử lại.");
            }
        };

        fetchData();
    }, []);

    const renderTuanOptions = () =>
        Array.from({ length: 20 }, (_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
        ));

    const handleCancelClick = () => {
        if (window.confirm("Bạn có chắc chắn muốn hủy không?")) {
            navigate('/duty_schedule/schedule');
        }
    };

    const handleSaveClick = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Bạn chưa đăng nhập");
            return;
        }

        const payload = scheduleData
            .filter(item => item.userId !== 0)
            .map(({ day, week, partDay, semesterId, userId }) => ({
                day, week, partDay, semesterId, userId
            }));

        if (payload.length === 0) {
            alert("Bạn chưa chọn cán bộ trực nào!");
            return;
        }

        try {
            await axios.put(`${API_BASE_URL}/update`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("Đã lưu lịch trực thành công");
            navigate('/duty_schedule/schedule');
        } catch (error) {
            console.error("Lỗi khi lưu lịch trực:", error);
            alert("Không thể lưu lịch trực. Vui lòng thử lại.");
        }
    };

    const handleChangeOfficer = useCallback((day: number, partDay: string, userId: number) => {
        setScheduleData(prev =>
            prev.map(item =>
                item.day === day && item.partDay === partDay
                    ? { ...item, userId }
                    : item
            )
        );
    }, []);

    return (
        <div className="content-main">
            <div className="updateschedule-wrapper">
                <h2>Quản lý lịch trực</h2>

                <div className="filters">
                    <h3>Học kỳ:</h3>
                    <select value={semesterId || ''} disabled>
                        <option value="">Chọn học kỳ</option>
                        {semesterList.map(s => (
                            <option key={s.id} value={s.id}>
                                {s.semesterName}
                            </option>
                        ))}
                    </select>

                    <h3>Tuần:</h3>
                    <select value={tuan} disabled>
                        {renderTuanOptions()}
                    </select>
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
                            {days.map((dayLabel, i) => {
                                const dayNumber = i + 2;
                                const sang = scheduleData.find(item => item.day === dayNumber && item.partDay === 'Sáng');
                                const chieu = scheduleData.find(item => item.day === dayNumber && item.partDay === 'Chiều');

                                return (
                                    <tr key={dayNumber}>
                                        <td><b>{dayLabel}</b></td>
                                        {['Sáng', 'Chiều'].map(part => {
                                            const item = part === 'Sáng' ? sang : chieu;
                                            return (
                                                <td key={part}>
                                                    <select
                                                        value={item?.userId || ''}
                                                        onChange={(e) =>
                                                            handleChangeOfficer(dayNumber, part, Number(e.target.value))
                                                        }
                                                    >
                                                        <option value="">--Chọn--</option>
                                                        {officers.map(officer => (
                                                            <option key={officer.id} value={officer.id}>
                                                                {officer.fullname}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>
                                            );
                                        })}
                                        <td></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="center">
                    <button className="btn-cancel" onClick={handleCancelClick}>Hủy</button>
                    <button className="btn-save" onClick={handleSaveClick}>Lưu</button>
                </div>
            </div>
        </div>
    );
};

export default UpdateSchedule;
