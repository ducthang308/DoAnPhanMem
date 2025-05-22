import axiosClient from './axiosClient';
import type { IRoom } from '../Types/interface';

export const getRoom = async (keyword?: string) => {
    try {
        // Tạo query param chỉ khi keyword có giá trị
        const query = keyword ? `?keyword=${encodeURIComponent(keyword)}` : '';
        const response = await axiosClient.get(`/api/v1/room${query}`);
        return response.data;
    } catch (error) {
        throw new Error('Load dữ liệu phòng máy thất bại');
    }
};



export const createRoom = async (roomName: string, floors: number): Promise<IRoom> => {
    try {
        const response = await axiosClient.post<IRoom>('/api/v1/room', {
            roomName,
            floors,
        });
        console.log({ roomName, floors });
        return response.data;
    } catch (error) {
        throw new Error('Thêm dữ liệu phòng máy thất bại');
    }
};

export const updateRoom = async (id: number, room: IRoom): Promise<IRoom> => {
    try {
        const response = await axiosClient.put<IRoom>(`/api/v1/room/${id}`, room);
        console.log({ id, room });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Cập nhật dữ liệu phòng máy thất bại');
    }
};


export const deleteRoom = async (id: number) => {
    try {
        const response = await axiosClient.delete<IRoom>(`/api/v1/room/${id}`);
        console.log({ id });
        return response.data;
    } catch (error) {
        throw new Error('Xóa dữ liệu phòng máy thất bại');
    }
};
