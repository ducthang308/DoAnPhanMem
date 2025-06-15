import React, { useState, useEffect, DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS } from "react";
import { useNavigate } from 'react-router-dom';
import "./ApprovalChangeSchedule.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { IScheduleChange } from "src/Types/interface";
import { approveChangeSchedule, getChangeSchedule, rejectChangeSchedule } from "../../../../Services/ScheduleService";

const ApprovalChangeSchedule = () => {

    const [changeSchedules, setChangeSchedules] = useState<IScheduleChange[]>([]);

    const getChangeSchedules = async () => {
        try {
            const changes = await getChangeSchedule();
            setChangeSchedules(changes);
        } catch (error: any) {
            console.error(error.message);
        }

    }

    useEffect(() => {
        getChangeSchedules();
    }, []);

    const handleApprove = async (id: number) => {
        try {
            await approveChangeSchedule(id);
            getChangeSchedules();
        } catch (error: any) {
            console.error(error.message);
        }
    }

    const handleReject = async (id: number) => {
        try {
            await rejectChangeSchedule(id);
            getChangeSchedules();
        } catch (error: any) {
            console.error(error.message);
        }
    }

    return (
        <div className="computer-detail">
            <h2>Danh sách yêu cầu đổi Lịch</h2>
            {/* <div className="info-header">
                <div>Phòng <span className="info-box">B201</span></div>
                <div>Máy <span className="info-box">05</span></div>
            </div> */}

            <table>
                <thead>
                    <tr>
                        <th>Lớp học phần</th>
                        <th>Giảng viên</th>
                        <th>Thứ</th>
                        <th>Từ tiết</th>
                        <th>Đến tiết</th>
                        <th>Thứ (mới)</th>
                        <th>Từ tiết (mới)</th>
                        <th>Đến tiết (mới)</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {changeSchedules.map(change => (
                        <tr>
                            <td>{change.practiceSchedule.classCode}</td>
                            <td>{change.users.fullName}</td>
                            <td>{change.practiceSchedule.date}</td>
                            <td>{change.practiceSchedule.fromPeriod}</td>
                            <td>{change.practiceSchedule.toPeriod}</td>
                            <td>{change.newDate}</td>
                            <td>{change.newFromPeriod}</td>
                            <td>{change.newToPeriod}</td>

                            <td>
                                {change.status === 'pending' ? (
                                    <>
                                        <button className="edit-btn" onClick={() => handleApprove(change.id)}>
                                            <FontAwesomeIcon icon={faCheck} style={{ color: 'green', marginRight: '10px' }} />
                                        </button>
                                        <button className="delete-btn" onClick={() => handleReject(change.id)}>
                                            <FontAwesomeIcon icon={faXmark} style={{ color: 'red' }} />
                                        </button>
                                    </>
                                ) : change.status === 'approved' ? (
                                    <span style={{ color: 'green', fontWeight: 'bold' }}>Đã duyệt</span>
                                ) : (
                                    <span style={{ color: 'red', fontWeight: 'bold' }}>Đã từ chối</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );

}

export default ApprovalChangeSchedule;