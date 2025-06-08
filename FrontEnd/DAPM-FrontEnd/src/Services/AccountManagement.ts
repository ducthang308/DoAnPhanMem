import axios from 'axios';
import axiosClient from './axiosClient';
import type { IUser } from '../Types/interface'
import type { UpdateProfile } from '../Types/interface'

// export const getUser = async () => {
//   try {
//     const token = localStorage.getItem('token');
//     const response = await axios.get('/api/v1/user', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error('Load dữ liệu người dùng thất bại');
//   }
// };

export const getUser = async () => {
    try {
        const response = await axiosClient.get('/api/v1/user');
        return response.data;
    } catch (error) {
        throw new Error('Load dữ liệu người dùng thất bại');
    }
};

export const getUserById = async (id: number) => {
    try {
        const response = await axiosClient.get(`/api/v1/user/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Load dữ liệu người dùng thất bại');
    }
};

export const updateProfile = async (id: number, user: UpdateProfile): Promise<UpdateProfile> => {
    try {
        const response = await axiosClient.patch<UpdateProfile>(`/api/v1/user/profile/${id}`, user);
        console.log({ id, user });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Cập nhật dữ liệu thông tin thất bại');
    }
};
