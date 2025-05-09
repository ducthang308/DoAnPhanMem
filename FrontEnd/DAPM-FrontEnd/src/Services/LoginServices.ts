// src/Services/LoginServices.ts
import axios from 'axios';
import type { LoginResponse } from '../Types/interface';

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>('/api/v1/user/login', { email, password });
    return response.data;
  } catch (error) {
    throw new Error('Đăng nhập thất bại');
  }
};
