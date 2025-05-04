import React, { useState } from 'react';
import "./index.css";

const Schedule = () => {
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
            <div className="content">
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
            </div>


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
                            <td>Văn Công Tường</td>
                            <td>Nguyễn Văn An</td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="center">
                <button className="btn-update">Cập nhật</button>
            </div>
            {/* </div> */}
        </div>
    );
};

export default Schedule;
