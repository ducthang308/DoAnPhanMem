import axiosClient from './axiosClient';
import { IComputerDTO, IMaintenanceDTO, IMaintenanceHistory, IRepairDTO, IRepairHistory, ISoftwareDTO, ISoftwareHistory, IUsageComputer, type IComputer } from '../Types/interface';
import { createPath } from 'react-router';

export const getComputersByRoomId = async (roomId: number): Promise<IComputer[]> => {
    try {
        const response = await axiosClient.get<IComputer[]>(`/api/v1/computer/getByRoom/${roomId}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi lấy dữ liệu máy theo phòng:', error);
        throw error;
    }
};

export const getComputerById = async (id: number) => {
    try {
        const response = await axiosClient.get<IComputer>(`/api/v1/computer/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const createComputer = async (computer: IComputerDTO) => {
    try {
        const response = await axiosClient.post(`api/v1/computer`, {
            roomId: computer.roomId,
            computerName: computer.computerName,
            operatingSystem: computer.operatingSystem,
            versions: computer.versions,
            mac: computer.mac,
            ipv4: computer.ipv4,
            ram: computer.ram,
            rom: computer.rom,
            cpu: computer.cpu,
            gpu: computer.gpu,
            usageDate: computer.usageDate
        });

        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const updateComputer = async (id: number, computer: IComputerDTO) => {
    try {
        const response = await axiosClient.put(`api/v1/computer/${id}`, {
            roomId: computer.roomId,
            computerName: computer.computerName,
            operatingSystem: computer.operatingSystem,
            versions: computer.versions,
            mac: computer.mac,
            ipv4: computer.ipv4,
            ram: computer.ram,
            rom: computer.rom,
            cpu: computer.cpu,
            gpu: computer.gpu,
            usageDate: computer.usageDate
        });

        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const deleteComputer = async (id: number) => {
    try {
        const response = await axiosClient.delete(`api/v1/computer/${id}`)
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const getUsageHistoryByComputerID = async (computerId: number): Promise<IUsageComputer[]> => {
    try {
        const response = await axiosClient.get<IUsageComputer[]>(`/api/v1/usage/getByComputer/${computerId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getMaintenanceByComputerID = async (computerId: number): Promise<IMaintenanceHistory[]> => {
    try {
        const response = await axiosClient.get<IMaintenanceHistory[]>(`/api/v1/maintenance/getByComputer/${computerId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const createMaintenanceHistory = async (computerId: number, maintenance: IMaintenanceDTO): Promise<IMaintenanceHistory> => {
    try {
        const response = await axiosClient.post(`/api/v1/maintenance/${computerId}`, {
            maintainedBy: maintenance.maintainedBy,
            maintenanceDate: maintenance.maintenanceDate,
            content: maintenance.content,
            notes: maintenance.notes
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const updateMaintenanceHistory = async (id: number, maintenance: IMaintenanceDTO): Promise<IMaintenanceHistory> => {
    try {
        const response = await axiosClient.put(`/api/v1/maintenance/${id}`, {
            maintainedBy: maintenance.maintainedBy,
            maintenanceDate: maintenance.maintenanceDate,
            content: maintenance.content,
            notes: maintenance.notes
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const deleteMaintenanceHistory = async (id: number) => {
    try {
        const response = await axiosClient.delete(`/api/v1/maintenance/${id}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const getRepairByComputerID = async (computerId: number) => {
    try {
        const response = await axiosClient.get<IRepairHistory[]>(`api/v1/repair/getByComputer/${computerId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const createRepairHistory = async (computerId: number, repair: IRepairDTO) => {
    try {
        const response = await axiosClient.post(`api/v1/repair/${computerId}`, {
            updateDate: repair.updateDate,
            errorName: repair.errorName,
            occurredDate: repair.occurredDate,
            repairedBy: repair.repairedBy,
            status: repair.status,
            notes: repair.notes
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const updateRepairHistory = async (id: number, repair: IRepairDTO) => {
    try {
        const response = await axiosClient.put(`api/v1/repair/${id}`, {
            updateDate: repair.updateDate,
            errorName: repair.errorName,
            occurredDate: repair.occurredDate,
            repairedBy: repair.repairedBy,
            status: repair.status,
            notes: repair.notes
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const getSoftwareByComputerID = async (id: number) => {
    try {
        const response = await axiosClient.get<ISoftwareHistory[]>(`api/v1/software/getByComputer/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export const deleteRepairHistory = async (id: number) => {
    try {
        const response = await axiosClient.delete(`api/v1/repair/${id}`)
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const createSoftwareHistory = async (computerId: number, software: ISoftwareDTO) => {
    try {
        const response = await axiosClient.post(`api/v1/software/${computerId}`, {
            softwareName: software.softwareName,
            installedVersion: software.installedVersion,
            installDate: software.installDate,
            installedBy: software.installedBy
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const updateSoftwareHistory = async (id: number, software: ISoftwareDTO) => {
    try {
        const response = await axiosClient.put(`api/v1/software/${id}`, {
            softwareName: software.softwareName,
            installedVersion: software.installedVersion,
            installDate: software.installDate,
            installedBy: software.installedBy
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const deleteSoftwareHistory = async (id: number) => {
    try {
        const response = await axiosClient.delete(`api/v1/software/${id}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const startComputer = async (id: number) => {
    try {
        const response = await axiosClient.post(`api/v1/usage`, {
            computerId: id
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const stopComputer = async (id: number) => {
    try {
        const response = await axiosClient.put(`api/v1/usage/${id}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}
