import React, { useState } from "react";
import './index.css'
import type { AddRoomFormProps } from "../../../../Types/interface";
import type { IRoom } from "../../../../Types/interface";

const AddRoomForm: React.FC<AddRoomFormProps> = ({ onClose, onSubmit, initialData }) => {
    const [roomName, setRoomName] = useState(initialData?.roomName || "");
    const [floors, setFloor] = useState(initialData?.floors || 1);

    const handleSubmit = () => {
        const roomData = {
            id: initialData?.id,
            roomName,
            floors
        };
        onSubmit(roomData);
        onClose();
    };

    return (
        <div className="overlay">
            <div className="form-frame">
                <h3>{initialData ? "CẬP NHẬT PHÒNG MÁY" : "THÊM PHÒNG MÁY"}</h3>

                <label>Tên Phòng</label>
                <input
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                />

                <label>Tầng</label>
                <select value={floors} onChange={(e) => setFloor(Number(e.target.value))}>
                    {[1, 2, 3, 4, 5].map((f) => (
                        <option key={f} value={f}>{f}</option>
                    ))}
                </select>

                <div className="actions">
                    <button className="cancel" onClick={onClose}>Hủy bỏ</button>
                    <button className="confirm" onClick={handleSubmit}>
                        {initialData ? "Cập nhật" : "Xác nhận"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddRoomForm;
