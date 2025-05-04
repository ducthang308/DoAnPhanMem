import React, { useState } from 'react';
import "./index.css";

const Room = () => {
  const [namHoc, setNamHoc] = useState('2024 - 2025');
  const [thu, setThu] = useState('2');
  const [tiet, setTiet] = useState('1 - 2');

  const classes = [
    {
      lop: '224TLTC#01',
      monHoc: 'TH Lập trình C#',
      thu: '2',
      tuTiet: '1',
      denTiet: '2',
      giangVien: 'Huỳnh Nhật Nam',
      phong: 'B201',
      ngayHieuLuc: '03/02/2025',
      ghiChu: '-',
    },
    {
      lop: '224TLTC#02',
      monHoc: 'TH Lập trình C#',
      thu: '3',
      tuTiet: '1',
      denTiet: '2',
      giangVien: 'Huỳnh Nhật Nam',
      phong: 'B201',
      ngayHieuLuc: '03/02/2025',
      ghiChu: '-',
    },
    {
      lop: '224TLTC#03',
      monHoc: 'TH Lập trình C#',
      thu: '3',
      tuTiet: '3',
      denTiet: '4',
      giangVien: 'Huỳnh Nhật Nam',
      phong: 'B201',
      ngayHieuLuc: '03/02/2025',
      ghiChu: '-',
    },
    {
      lop: '224TLTC#05',
      monHoc: 'TH Lập trình C#',
      thu: '4',
      tuTiet: '1',
      denTiet: '2',
      giangVien: 'Huỳnh Nhật Nam',
      phong: 'B201',
      ngayHieuLuc: '03/02/2025',
      ghiChu: '-',
    },
    {
      lop: '224TLTC#06',
      monHoc: 'TH Lập trình C#',
      thu: '4',
      tuTiet: '3',
      denTiet: '4',
      giangVien: 'Huỳnh Nhật Nam',
      phong: 'B201',
      ngayHieuLuc: '03/02/2025',
      ghiChu: '-',
    }
  ];

  return (
    <div className="content-main">
      <div className="content">
        <h2>Quản lý sơ đồ phòng TH</h2>

        <div className="filters">
            <h3>Năm học:</h3>
            <select value={namHoc} onChange={(e) => setNamHoc(e.target.value)}>
              <option>2023 - 2024</option>
              <option>2024 - 2025</option>
              <option>2025 - 2026</option>
            </select>
            <h3>Thứ:</h3>
            <select value={thu} onChange={(e) => setThu(e.target.value)}>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
            </select>

            <h3>Tiết:</h3>
            <select value={tiet} onChange={(e) => setTiet(e.target.value)}>
              <option>1 - 2</option>
              <option>3 - 4</option>
              <option>5 - 6</option>
              <option>7 - 8</option>
            </select>
        </div>
        <h3 className="center">Sơ đồ phòng thực hành tầng 2</h3>
        <h3 className="center">Danh sách lớp học phần</h3>

        <table className="data-table">
          <thead>
            <tr>
              <th>Lớp</th>
              <th>Môn học</th>
              <th>Thứ</th>
              <th>Từ tiết</th>
              <th>Đến tiết</th>
              <th>Giảng viên</th>
              <th>Phòng</th>
              <th>Ngày hiệu lực</th>
              <th>Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((item, index) => (
              <tr key={index}>
                <td>{item.lop}</td>
                <td>{item.monHoc}</td>
                <td>{item.thu}</td>
                <td>{item.tuTiet}</td>
                <td>{item.denTiet}</td>
                <td>{item.giangVien}</td>
                <td>{item.phong}</td>
                <td>{item.ngayHieuLuc}</td>
                <td>{item.ghiChu}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="center">
          <button className="btn-update">Cập nhật</button>
        </div>
      </div>
    </div>
  );
};

export default Room;