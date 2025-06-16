import { ISchedule, IScheduleChange, IScheduleChangeDTO, IStudentSchedule } from 'src/Types/interface';
import axiosClient from './axiosClient';
import { createPath } from 'react-router';
import Schedule from 'src/Component/ContentComponent/ScheduleComponent';

export const getPracticeSchedule = async (): Promise<ISchedule[]> => {
    try {
        const response = await axiosClient.get<ISchedule[]>(`/api/v1/schedule/getByUser`);
        return response.data;
    } catch (error) {
        console.error('Lỗi lấy dữ liệu LHP:', error);
        throw error;
    }
}

export const getStudentPracticeSchedule = async (): Promise<IStudentSchedule[]> => {
    try {
        const response = await axiosClient.get<IStudentSchedule[]>(`/api/v1/class/getByStudent`);
        return response.data;
    } catch (error) {
        console.error('Lỗi lấy dữ liệu LHP:', error);
        throw error;
    }
}

export const getPracticeScheduleById = async (id: number): Promise<ISchedule> => {
    try {
        const response = await axiosClient.get(`/api/v1/schedule/${id}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi lấy dữ liệu LHP:', error);
        throw error;
    }
}

export const createScheduleChangeRequest = async (scheduleChange: IScheduleChangeDTO) => {
    try {
        const response = await axiosClient.post(`api/v1/scheduleChange`, {
            newDate: scheduleChange.newDate,
            newFromPeriod: scheduleChange.newFromPeriod,
            newToPeriod: scheduleChange.newToPeriod,
            reason: scheduleChange.reason,
            practiceScheduleId: scheduleChange.practiceScheduleId
        });

        return response.data
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const getChangeSchedule = async (): Promise<IScheduleChange[]> => {
    try {
        const response = await axiosClient.get(`api/v1/scheduleChange`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const approveChangeSchedule = async (id: number) => {
    try {
        const response = await axiosClient.put(`api/v1/scheduleChange/approve/${id}`);
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const rejectChangeSchedule = async (id: number) => {
    try {
        const response = await axiosClient.put(`api/v1/scheduleChange/reject/${id}`);
    } catch (error: any) {
        throw new Error(error.message);
    }
}