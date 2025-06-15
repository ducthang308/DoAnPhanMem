import React, { useEffect, useState } from 'react';
import './RequestChangeSchedule.css';
import { ISchedule } from 'src/Types/interface';
import { createScheduleChangeRequest, getPracticeSchedule, getPracticeScheduleById } from '../../../../Services/ScheduleService';



const RequestChangeSchedule = () => {
    const [schedules, setSchedules] = useState<ISchedule[]>([]);
    const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
    const [schedule, setSchedule] = useState<ISchedule>();

    const [newDate, setNewDate] = useState<number>(2); // mặc định "Thứ 2" (giá trị tương ứng select)
    const [newFromPeriod, setNewFromPeriod] = useState<number>(1);
    const [newToPeriod, setNewToPeriod] = useState<number>(1);
    const [reason, setReason] = useState<string>('');

    const getPractice = async () => {
        try {
            const practiceChedules = await getPracticeSchedule();
            setSchedules(practiceChedules);

            if (practiceChedules.length > 0) {
                setSelectedScheduleId(practiceChedules[0].id);
            }
        } catch (error: any) {
            console.error(error.message);
        }
    };

    const getPracticeById = async (id: number) => {
        try {
            const practiceChedule = await getPracticeScheduleById(id);
            setSchedule(practiceChedule);
        } catch (error: any) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getPractice();
    }, []);

    useEffect(() => {
        if (selectedScheduleId !== null) {
            getPracticeById(selectedScheduleId).catch(err => console.error(err));
        }
    }, [selectedScheduleId]);

    const handleSubmit = async () => {
        if (selectedScheduleId === null) {
            alert("Vui lòng chọn lịch học phần!");
            return;
        }

        if (newFromPeriod > newToPeriod) {
            alert("Tiết bắt đầu phải nhỏ hơn hoặc bằng tiết kết thúc.");
            return;
        }

        if (!reason.trim()) {
            alert("Vui lòng nhập lý do đổi lịch.");
            return;
        }

        try {

            await createScheduleChangeRequest({
                newDate,
                newFromPeriod,
                newToPeriod,
                reason,
                practiceScheduleId: selectedScheduleId,
            });
            alert("Gửi yêu cầu thành công!");
            // setNewDate(2);
            // setNewFromPeriod(1);
            // setNewToPeriod(1);
            // setReason('');
            // setSelectedScheduleId(null);
            // setSchedule(undefined);
        } catch (error: any) {
            alert("Lỗi khi gửi yêu cầu: " + error.message);
        }
    };

    return (
        <div className="content-main">
            <div className="change-schedule-container">
                <h2>Yêu cầu đổi lịch</h2>

                <div className="form-grid">
                    <div className="form-label">Lớp học phần</div>
                    <div className="form-input form-row">
                        <select className="input-select"
                            value={selectedScheduleId ?? ''}
                            onChange={(e) => {
                                setSelectedScheduleId(Number(e.target.value));
                                getPracticeById(Number(e.target.value));
                            }}>
                            {schedules.map((scheduleItem) => (
                                <option key={scheduleItem.id}
                                    value={scheduleItem.id}>
                                    {scheduleItem.classCode}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-label">Môn học</div>
                    <input
                        type="text"
                        className="input-text"
                        id="subjectName"
                        readOnly
                        value={schedule?.subject ?? ''}
                    />

                    <div className="form-label">Thứ</div>
                    <div className="form-input form-row">
                        <select
                            className="input-select"
                            value={newDate}
                            onChange={e => setNewDate(Number(e.target.value))}
                        >
                            <option value={2}>Thứ 2</option>
                            <option value={3}>Thứ 3</option>
                            <option value={4}>Thứ 4</option>
                            <option value={5}>Thứ 5</option>
                            <option value={6}>Thứ 6</option>
                            <option value={7}>Thứ 7</option>
                            <option value={8}>Chủ Nhật</option>
                        </select>

                    </div>

                    <div className="form-label">Từ tiết</div>
                    <div className="form-input form-row">
                        <select
                            className="input-select"
                            value={newFromPeriod}
                            onChange={e => setNewFromPeriod(Number(e.target.value))}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                    </div>

                    <div className="form-label">Đến tiết</div>
                    <div className="form-input form-row">
                        <select
                            className="input-select"
                            value={newToPeriod}
                            onChange={e => setNewToPeriod(Number(e.target.value))}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                    </div>

                    <div className="form-label">Lý do</div>
                    <textarea
                        className="input-textarea"
                        placeholder="Nhập lý do..."
                        value={reason}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReason(e.target.value)}
                    ></textarea>
                </div>

                <div className="form-buttons">
                    <button className="cancel-button" onClick={() => {
                        // reset hoặc đóng form
                        // setNewDate(2);
                        // setNewFromPeriod(1);
                        // setNewToPeriod(1);
                        // setReason('');
                        // setSelectedScheduleId(null);
                        // setSchedule(undefined);
                    }}>Hủy bỏ</button>

                    <button className="confirm-button" onClick={handleSubmit}>Xác nhận</button>
                </div>

            </div>
        </div>
    );
};

export default RequestChangeSchedule;
