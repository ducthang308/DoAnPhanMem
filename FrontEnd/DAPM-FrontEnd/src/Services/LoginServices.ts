// src/Services/LoginServices.ts
import axios from 'axios';
import type { LoginResponse } from '../Types/interface';
import axiosClient from './axiosClient';

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>('/api/v1/user/login', {
      email,
      password
    });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Đăng nhập thất bại');
    }
    throw new Error('Đăng nhập thất bại');
  }
};

export const updateStatus = async (id: number, currentStatus: boolean): Promise<LoginResponse> => {
  const newStatus = !currentStatus;
  try {
    const response = await axiosClient.put<LoginResponse>(`/api/v1/user/active/${id}`, {
      status: newStatus,
    });
    return response.data;
  } catch (error) {
    throw new Error('Cập nhật thất bại');
  }
};
