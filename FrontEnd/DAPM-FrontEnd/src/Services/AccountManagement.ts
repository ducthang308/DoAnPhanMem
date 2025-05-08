import axios from 'axios';
import axiosClient from './axiosClient';

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