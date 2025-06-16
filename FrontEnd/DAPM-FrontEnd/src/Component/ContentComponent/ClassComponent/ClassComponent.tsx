import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./ClassComponent.css"
import { ISchedule, IStudentSchedule } from "src/Types/interface";
import { getStudentPracticeSchedule } from "../../../Services/ScheduleService";

const ClassComponent = () => {

    const [schedules, setSchedules] = useState<IStudentSchedule[]>([]);

    const getStudentPractice = async () => {
            try {
                const practiceChedules = await getStudentPracticeSchedule();
                setSchedules(practiceChedules);
            } catch (error: any) {
                console.error(error.message);
            }
        };


    useEffect(() => {
        getStudentPractice();
    }, []);

    return (
        <div className="computer-detail">
            <h2>Thời khoá biểu sinh viên</h2>
            {/* <div className="info-header">
                <div>Phòng <span className="info-box">B201</span></div>
                <div>Máy <span className="info-box">05</span></div>
            </div> */}

            <table className="table-change">
                <thead>
                    <tr>
                        <th>Lớp học phần</th>
                        <th>Tên học phần</th>
                        <th>Thứ</th>
                        <th>Từ tiết</th>
                        <th>Đến tiết</th>
                        <th>Giảng viên</th>
                        <th>Phòng</th>
                        <th>Ghi chú</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.map(change => (
                        <tr>
                            <td>{change.classCode}</td>
                            <td>{change.subject}</td>
                            <td>{change.date}</td>
                            <td>{change.fromPeriod}</td>
                            <td>{change.toPeriod}</td>
                            <td>{change.lecturerName}</td>
                            <td>{change.roomName}</td>
                            <td>{change.notes}</td>

                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );

}

export default ClassComponent;