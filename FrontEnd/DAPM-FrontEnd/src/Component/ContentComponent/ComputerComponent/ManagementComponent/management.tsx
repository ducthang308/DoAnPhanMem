import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { IRoom } from '../../../../Types/interface.ts';
import "./index.css"
import Search from '../../../SearchComponent/search'
import AddButton from "../../../ButtonComponent/add"
import DeleteButton from "../../../ButtonComponent/deleteButton"
import UpdateButton from "../../../ButtonComponent/update"
import { getRoom } from '../../../../Services/ComputerManagement'
import { createRoom } from '../../../../Services/ComputerManagement'
import { updateRoom } from '../../../../Services/ComputerManagement'
import { deleteRoom } from '../../../../Services/ComputerManagement'
import AddRoomForm from '../AddComponent/addcomputer';

const management = () => {
    const [room, setRoom] = useState<IRoom[]>([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editRoom, setEditRoom] = useState<IRoom | null>(null);
    const [keyword, setKeyword] = useState('');

    const fetchData = async () => {
        try {
            const data = await getRoom();
            console.log(data);
            setRoom(data);
        } catch (error: any) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteRoom = async (id: number) => {
        try {
            await deleteRoom(id);
            fetchData();
        } catch (error: any) {
            console.error(error.message);
        }
    };

    const handleUpdateRoom = async (room: IRoom) => {
        try {
            if (room.id != null) {
                await updateRoom(room.id, room);
            } else {
                await createRoom(room.roomName, room.floors);
            }
            fetchData();
        } catch (error: any) {
            console.error(error.message);
        }
    };

    const handleCloseForm = () => {
        setShowAddForm(false);
        setEditRoom(null);
    };

    const handleSearch = async (keyword: string) => {
        try {
            const data = await getRoom(keyword);
            console.log(data);
            setRoom(data);
        } catch (error: any) {
            console.error(error.message);
        }
    }
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            handleSearch(keyword);
        }, 500);
        return () => clearTimeout(delayDebounce);
    }, [keyword]);




    return (
        <div className="container-computer">
            <Search value={keyword} onChange={setKeyword} />


            <div className="content-computer">
                <p className="title">Quản lý phòng máy</p>

                <div className="table">
                    {/* <div className="computer-button">
                        <div className="button">
                            <AddButton onClick={() => setShowAddForm(true)} />
                        </div>
                    </div> */}
                    <div className="table-label">
                        <h3>Danh sách phòng</h3>
                        <button type="button" onClick={() => setShowAddForm(true)} className="create-room-button">+ Thêm</button>

                    </div>


                    <table className="room-table">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tầng</th>
                                <th>Tên phòng</th>
                                <th>Hoạt động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {room.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>Tầng {item.floors}</td>
                                    <td>{item.roomName}</td>

                                    <td className='action'>
                                        <UpdateButton onClick={() => {
                                            setEditRoom(item);
                                            setShowAddForm(true);
                                        }} />
                                        {item.id !== undefined && (
                                            <DeleteButton onClick={() => handleDeleteRoom(item.id!)} />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>

            {showAddForm && (
                <AddRoomForm
                    onClose={handleCloseForm}
                    onSubmit={handleUpdateRoom}
                    initialData={editRoom ?? undefined}
                />
            )}

        </div>
    );
}

export default management