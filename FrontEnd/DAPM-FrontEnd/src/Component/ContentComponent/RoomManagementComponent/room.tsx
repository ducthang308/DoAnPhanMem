import React, { useState, useEffect } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface RoomItem {
  id: number;
  date: number;
  week: number;
  partDay: string;
  semesterId: number;
  semesterName: string;
  year: string;
  userId: number;
  users?: { fullName: string };
  room?: { id: number; roomName: string };
  classCode: string;
  subject: string;
  fromPeriod: number;
  toPeriod: number;
  effectiveDate: string;
  note: string;
}

interface Semester {
  id: number;
  semesterName: string;
  startYear: number;
  endYear: number;
}

const Room = () => {
  const API_BASE_URL = 'http://localhost:8080/api/v1/lab';
  const navigate = useNavigate();

  const [semesterId, setSemesterId] = useState<number | ''>('');
  const [semesterList, setSemesterList] = useState<Semester[]>([]);
  const [thu, setThu] = useState('');
  const [fromPeriod, setFromPeriod] = useState<number | ''>('');
  const [toPeriod, setToPeriod] = useState<number | ''>('');
  const [roomData, setroomData] = useState<RoomItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorPeriod, setErrorPeriod] = useState<string | null>(null);

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
      const response = await axios.get(`http://localhost:8080/api/v1/duty_schedule/semesters`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSemesterList(response.data);
      // if (response.data.length > 0) {
      //   setSemesterId(response.data[0].id);
      // }
    } catch (error) {
      setError('Không thể tải danh sách học kỳ. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRoomData = async () => {
    console.log(semesterId, thu, fromPeriod, toPeriod);
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const params: any = {
        semesterId: semesterId,
      };

      if (thu !== '') {
        const dayParsed = thu === 'CN' ? 8 : parseInt(thu);
        if (!isNaN(dayParsed)) {
          params.dayOfWeek = dayParsed;
        }
      }

      if (fromPeriod !== '') {
        params.fromPeriod = Number(fromPeriod);
      }
      if (toPeriod !== '') {
        params.toPeriod = Number(toPeriod);
      }

      const response = await axios.get(`${API_BASE_URL}/filter`, {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });

      setroomData(response.data);
    } catch (error) {
      setError('Không thể tải lịch trực. Vui lòng thử lại.');
      console.error("Lỗi khi gọi API:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchInitRoomData = async () => {
    console.log(semesterId, thu, fromPeriod, toPeriod);
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await axios.get(`${API_BASE_URL}/labs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setroomData(response.data);
    } catch (error) {
      setError('Không thể tải lịch trực. Vui lòng thử lại.');
      console.error("Lỗi khi gọi API:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (
      semesterId !== null && semesterId !== '' ||
      thu !== '' ||
      fromPeriod !== '' ||
      toPeriod !== ''
    ) {
      fetchRoomData();
    } else {
      fetchInitRoomData();
    }
  }, [semesterId, thu, fromPeriod, toPeriod]);

  const handleUpdateClick = (roomData: RoomItem[]) => {
    navigate('/it-officer/duty_schedule/update-room', { state: { roomData, semesterId, thu, fromPeriod, toPeriod } });
  };
  const handleSemesterIdChange = (value: string) => {
    if (value === "") {
      setSemesterId(""); 
    } else {
      setSemesterId(Number(value));
    }
  };
  const handleThuChange = (value: string) => {
    if (value === "") {
      setThu(""); 
    } else {
      setThu(value);
    }
  };
  const handleFromPeriodChange = (value: String) => {
    setFromPeriod(Number(value));
    if (toPeriod !== '' && Number(value) > toPeriod) {
      setErrorPeriod('Tiết bắt đầu phải nhỏ hơn hoặc bằng tiết kết thúc');
    } else {
      setErrorPeriod(null);
    }
    if (value === "") {
      setFromPeriod("");
    } else {
      setFromPeriod(Number(value));
    }
  };

  const handleToPeriodChange = (value: String) => {
    setToPeriod(Number(value));
    if (fromPeriod !== '' && Number(value) < fromPeriod) {
      setErrorPeriod('Tiết kết thúc phải lớn hơn hoặc bằng tiết bắt đầu');
    } else {
      setErrorPeriod(null);
    }
    if (value === "") {
      setToPeriod("");
    } else {
      setToPeriod(Number(value));
    }
  };

  return (
    <div className="content-main">
      <div className="room-wrapper">
        <h2>Quản lý sơ đồ phòng TH</h2>

        <div className="filters">
          <h3>Học kỳ:</h3>
          <select value={semesterId ?? ''} onChange={(e) => handleSemesterIdChange(e.target.value)}>
            <option value="">Chọn học kỳ</option>
            {semesterList.map((semester) => (
              <option key={semester.id} value={semester.id}>
                {semester.semesterName}
              </option>
            ))}
          </select>

          <h3>Thứ:</h3>
          <select value={thu} onChange={(e) => handleThuChange(e.target.value)}>
            <option value="">Tất cả</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="CN">CN</option>
          </select>

          <h3>Từ tiết:</h3>
          <select value={fromPeriod} onChange={(e) => handleFromPeriodChange(e.target.value)}>
            <option value="" >Chọn tiết</option>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((period) => (
              <option key={period} value={period}>{period}</option>
            ))}
          </select>

          <h3>Đến tiết:</h3>
          <select value={toPeriod} onChange={(e) => handleToPeriodChange(e.target.value)}>
            <option value="" >Chọn tiết</option>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((period) => (
              <option key={period} value={period}>{period}</option>
            ))}
          </select>

          {errorPeriod && <p style={{ color: 'red' }}>{errorPeriod}</p>}
        </div>

        {/* <h3 className="center">Sơ đồ phòng thực hành tầng 2</h3> */}
        <h3 className="center">Danh sách lớp học phần</h3>

        {error && <p className="error">{error}</p>}
        {isLoading ? (
          <p>Đang tải dữ liệu...</p>
        ) : (
          <div className="table-wrapper">
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
                {roomData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.classCode}</td>
                    <td>{item.subject}</td>
                    <td>{item.date}</td>
                    <td>{item.fromPeriod}</td>
                    <td>{item.toPeriod}</td>
                    <td>{item.users?.fullName}</td>
                    <td>{item.room?.roomName}</td>
                    <td>{new Date(item.effectiveDate).toLocaleDateString('vi-VN')}</td>
                    <td>{item.note || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="center">
          <button className="btn-update-room" onClick={() => handleUpdateClick(roomData)}>Cập nhật</button>
        </div>
      </div>
    </div>
  );
};

export default Room;