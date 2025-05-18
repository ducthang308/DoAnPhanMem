import React, { useState } from 'react';
import "./index.css";
import { useNavigate } from 'react-router-dom';
const danhSachNguoiTruc = [
    "Văn Công Tường",
    "Nguyễn Văn An",
    "Lê Thị Bích",
    "Phạm Minh Hoàng"
];

const UpdateSchedule = () => {
    const navigate = useNavigate();

    const handleCancelClick = () => {
        alert("Đã hủy");
        navigate('/schedule');
    };
    const handleSaveClick = () => {
        alert("Đã lưu");
        navigate('/schedule');
    };
    const [namHoc, setNamHoc] = useState("2024 - 2025");
    const [thang, setThang] = useState(3);
    const [tuan, setTuan] = useState(34);
    const [data, setData] = useState([
        "Thứ 2",
        "Thứ 3",
        "Thứ 4",
        "Thứ 5",
        "Thứ 6",
        "Thứ 7",
        "Chủ nhật"
    ]);

    const renderThangOptions = () => {
        const options = [];
        for (let i = 1; i <= 12; i++) {
            options.push(<option key={i} value={i}>{i}</option>);
        }
        return options;
    };

    const renderTuanOptions = () => {
        const options = [];
        for (let i = 1; i <= 52; i++) {
            options.push(<option key={i} value={i}>{i}</option>);
        }
        return options;
    };

    return (
        <div className="content-main">
            <div className="updateschedule-wrapper">
                <h2>Quản lý lịch trực</h2>

                <div className="filters">
                    <h3>Năm học:</h3>
                    <select value={namHoc} onChange={(e) => setNamHoc(e.target.value)}>
                        <option value="2023 - 2024">2023 - 2024</option>
                        <option value="2024 - 2025">2024 - 2025</option>
                        <option value="2025 - 2026">2025 - 2026</option>
                    </select>

                    <h3>Tháng:</h3>
                    <select value={thang} onChange={(e) => setThang(Number(e.target.value))}>
                        {renderThangOptions()}
                    </select>

                    <h3>Tuần:</h3>
                    <select value={tuan} onChange={(e) => setTuan(Number(e.target.value))}>
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
                            {data.map((ngay, index) => (
                                <tr key={index}>
                                    <td><b>{ngay}</b></td>
                                    <td>
                                        <select>
                                            {danhSachNguoiTruc.map((nguoi, idx) => (
                                                <option key={idx} value={nguoi}>{nguoi}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <select>
                                            {danhSachNguoiTruc.map((nguoi, idx) => (
                                                <option key={idx} value={nguoi}>{nguoi}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td></td>
                                </tr>
                            ))}
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
