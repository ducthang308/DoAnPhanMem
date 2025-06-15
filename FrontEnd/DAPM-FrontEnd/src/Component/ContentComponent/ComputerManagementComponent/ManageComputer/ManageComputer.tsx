import React, { useEffect, useState } from 'react';
import './ManageComputer.css';
import { getAllRoom, getRoom } from '../../../../Services/ComputerManagement'
import { createComputer, getComputersByRoomId } from '../../../../Services/ComputerService';
import type { IRoom, IComputer, IComputerDTO } from '../../../../Types/interface.ts';
import { Link } from 'react-router';
import { IconFamily } from '@fortawesome/fontawesome-svg-core';
import AddComputerForm from '../ComputerEditComponent/ComputerEdit';

const ManageComputer = () => {
    const [rooms, setRooms] = useState<IRoom[]>([]);
    const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null); // phòng được chọn
    const [computers, setComputers] = useState<IComputer[]>([]);

    const fetchData = async () => {
        try {
            const rooms = await getRoom();
            console.log(rooms);
            setRooms(rooms);
            if (rooms.length > 0) {
                setSelectedRoomId(rooms[0].id);
            }
        } catch (error: any) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const rooms = await getRoom();
                setRooms(rooms);
                if (rooms.length > 0) {
                    setSelectedRoomId(rooms[0].id);
                }
            } catch (error: any) {
                console.error(error.message);
            }
        };
        fetchRooms();
    }, []);

    useEffect(() => {
        if (selectedRoomId !== null) {
            getComputersByRoomId(selectedRoomId)
                .then(data => setComputers(data))
                .catch(err => console.error(err));
        } else {
            setComputers([]);
        }
    }, [selectedRoomId]);

    const [addComputerForm, setAddComputerForm] = useState(false);

    const handleAddComputer = async (roomId: number, computer: IComputerDTO) => {
        try {
            computer.roomId = roomId;
            const response = await createComputer(computer);
            alert("Thêm máy tính thành công!");
            setAddComputerForm(false);
            const updatedComputers = await getComputersByRoomId(roomId);
            setComputers(updatedComputers);
        } catch (error) {
            console.error(error);
            alert("Lỗi khi thêm máy tính!");
        }
    }

    return (
        <div className="manage-computer">
            <div className="header">
                <input type="text" placeholder="Tìm kiếm" className="search" />

                <h2>Quản lý máy tính</h2>
                <div className="room">
                    <span>Phòng</span>
                    <div className="form-input form-row">
                        <select className="input-select"
                            value={selectedRoomId ?? ''}
                            onChange={(e) => setSelectedRoomId(Number(e.target.value))}>
                            {/* <option value="1">B201</option>
                            <option value="1">B202</option>
                            <option value="3">B203</option>
                            <option value="4">B204</option>
                            <option value="5">B205</option> */}
                            {rooms.map((room) => (
                                <option key={room.id} value={room.id}>
                                    {room.roomName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="computer-grid">
                {computers.map(computer => (
                    <Link to={`./detail?id=${computer.id}`} className='computer'>
                        <div className="computer-item" key={computer.id}>

                            Máy<br />{computer.computerName}

                        </div>
                    </Link>
                ))}
            </div>
            <div className="button-group">
                {/* <button className="btn btn-view">Xem</button>
                <button className="btn btn-edit">Thêm</button>
                <button className="btn btn-delete">Xóa</button> */}
                <button type="button" onClick={() => setAddComputerForm(true)} className="btn btn-update" >Thêm</button>
            </div>
            {addComputerForm && (
                <AddComputerForm
                    initialData={{}}
                    onClose={() => setAddComputerForm(false)}
                    onSubmit={(formData) => { handleAddComputer(Number(selectedRoomId), formData) }}
                />
            )}
        </div>

    );
};

export default ManageComputer;
