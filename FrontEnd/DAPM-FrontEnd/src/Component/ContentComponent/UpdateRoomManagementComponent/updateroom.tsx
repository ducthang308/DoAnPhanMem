import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./index.css";

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

interface RoomOption {
  id: number;
  roomName: string;
}

interface Semester {
  id: number;
  semesterName: string;
  startYear: number;
  endYear: number;
}

const UpdateRoom = () => {
  const API_BASE_URL = 'http://localhost:8080/api/v1';
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { roomData: RoomItem[]; semesterId: number; thu: string; fromPeriod: number; toPeriod: number } | undefined;
  console.log(state)
  const [semesterId, setSemesterId] = useState<number>(state?.semesterId || 0);
  const [thu, setThu] = useState<string>(state?.thu || '');
  const [fromPeriod, setFromPeriod] = useState<number>(state?.fromPeriod || 0);
  const [toPeriod, setToPeriod] = useState<number>(state?.toPeriod || 0);
  const [roomOptions, setRoomOptions] = useState<RoomOption[]>([]);
  const [roomData, setroomData] = useState<RoomItem[]>(state?.roomData || []);
  const [semesterList, setSemesterList] = useState<Semester[]>([]);
  console.log(semesterList)
  useEffect(() => {
    const fetchRooms = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("Bạn chưa đăng nhập");
        navigate('/login');
        return;
      }
      try {
        const [roomOptions, semestersRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/room`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`http://localhost:8080/api/v1/duty_schedule/semesters`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
        ]);

        setRoomOptions(roomOptions.data);
        setSemesterList(semestersRes.data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách phòng:", error);
        alert("Không thể tải danh sách phòng. Vui lòng thử lại.");
      }
    };
    fetchRooms();
  }, [navigate]);

  const handleChangeRoom = useCallback((index: number, roomId: number) => {
    setroomData(prev =>
      prev.map((item, i) =>
        i === index
          ? { ...item, room: { id: roomId, roomName: roomOptions.find(r => r.id === roomId)?.roomName || '' } }
          : item
      )
    );
  }, [roomOptions]);

  const handleCancelClick = () => {
    navigate('/it-officer/room-class/');
  };

  const handleSaveClick = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Bạn chưa đăng nhập");
      navigate('/login');
      return;
    }
    const payload = {
      updates: roomData
        .filter(item => item.room?.id)
        .map(item => ({ labId: item.id, roomId: item.room!.id }))
    };
    if (payload.updates.length === 0) {
      alert("Vui lòng chọn ít nhất một phòng để cập nhật.");
      return;
    }

    try {
      await axios.put(`${API_BASE_URL}/lab/update-rooms-bulk`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Đã cập nhật phòng thành công");
      navigate('/it-officer/room-class/');
    } catch (error) {
      console.error("Lỗi khi cập nhật phòng:", error);
      alert("Không thể cập nhật phòng. Vui lòng thử lại.");
    }
  };

  return (
    <div className="content-main">
      <div className="updateroom-wrapper">
        <h2>Quản lý sơ đồ phòng TH</h2>
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

          <h3>Thứ:</h3>
          <select value={thu} disabled>
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
          <select value={fromPeriod} disabled>
            <option value="">Chọn tiết</option>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((period) => (
              <option key={period} value={period}>{period}</option>
            ))}
          </select>

          <h3>Đến tiết:</h3>
          <select value={toPeriod} disabled>
            <option value="">Chọn tiết</option>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((period) => (
              <option key={period} value={period}>{period}</option>
            ))}
          </select>
        </div>
        <h3 className="center">Danh sách lớp học phần</h3>
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
              {roomData.length > 0 ? (
                roomData.map((item, index) => (
                  <tr key={item.id || index}>
                    <td>{item.classCode}</td>
                    <td>{item.subject}</td>
                    <td>{item.date}</td>
                    <td>{item.fromPeriod}</td>
                    <td>{item.toPeriod}</td>
                    <td>{item.users?.fullName || 'N/A'}</td>
                    <td>
                      <select
                        value={item.room?.id || ''}
                        onChange={(e) => handleChangeRoom(index, Number(e.target.value))}
                      >
                        <option value="">-- Chọn phòng --</option>
                        {roomOptions.map(room => (
                          <option key={room.id} value={room.id}>{room.roomName}</option>
                        ))}
                      </select>
                    </td>
                    <td>{new Date(item.effectiveDate).toLocaleDateString('vi-VN')}</td>
                    <td>{item.note}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9}>Không có dữ liệu</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="button-group">
          <button className="btn-cancel" onClick={handleCancelClick}>Hủy</button>
          <button className="btn-save" onClick={handleSaveClick}>Lưu</button>
        </div>

      </div>
    </div>
  );
};

export default UpdateRoom;