export interface LoginResponse {
    token: string;
    id: number;
    email: string;
    roles_id: number;
    address: string;
    full_name: string;
    status: boolean;
}


export interface AddButtonProps {
    onClick: () => void;
}

export interface UpdateButtonProps {
    onClick: () => void;
}

export interface DeleteButtonProps {
    onClick: () => void;
}

export interface SearchProps {
    value: string;
    onChange: (value: string) => void;
}

export interface IUser {
    id: number;
    fullName: string;
    email: string;
    password: string;
    address: string;
    status: boolean;
    phoneNumber: string;
    roles_id: number;
}

export interface UpdateProfile {
    fullName: string;
    email: string;
    address: string;
    phoneNumber: string;
}

export interface IRoom {
    id?: number;
    roomName: string;
    floors: number
}

export interface AddRoomFormProps {
    onClose: () => void;
    onSubmit: (room: { id?: number; roomName: string; floors: number }) => void | Promise<void>;
    initialData?: { id?: number; roomName: string; floors: number };
}

export interface IRole {
    id: number;
    roleName: string;
}

export interface IComputer {
    id: number;
    computerName: string;
    operatingSystem: string;
    versions: string;
    mac: string;
    ipv4: string;
    ram: string;
    rom: string;
    cpu: string;
    gpu: string;
    usageDate: string;
    room: IRoom;
};

export interface IComputerDTO {
    roomId: number;
    computerName: string;
    operatingSystem: string;
    versions: string;
    mac: string;
    ipv4: string;
    ram: string;
    rom: string;
    cpu: string;
    gpu: string;
    usageDate: string;
}

export interface AddComputerFormProps {
    onClose: () => void;
    onSubmit: (computer: IComputerDTO) => void | Promise<void>;
    initialData?: Partial<IComputerDTO>;
}

export interface IMaintenanceHistory {
    id: number;
    computer: IComputer;
    maintainedBy: string;
    maintenanceDate: string;
    content: string;
    notes: string;
}

// export interface AddRoomFormProps {
//     onClose: () => void;
//     onSubmit: (room: { id?: number; roomName: string; floors: number }) => void | Promise<void>;
//     initialData?: { id?: number; roomName: string; floors: number };
// }

export interface AddMaintenanceFormProps {
    onClose: () => void;
    onSubmit: (maintenance: {maintainedBy: string; maintenanceDate: string; content: string; notes: string}) => void | Promise<void>;
    initialData?: Partial<IMaintenanceDTO>;
}

export interface IMaintenanceDTO {
    maintainedBy: string;
    maintenanceDate: string;
    content: string;
    notes: string;
}

export interface IRepairHistory {
    id: number;
    computer: IComputer;
    updateDate: string;
    errorName: string;
    occurredDate: string;
    repairedBy: string;
    status: string;
    notes: string;
}

export interface IRepairDTO {
    updateDate: string;
    errorName: string;
    occurredDate: string;
    repairedBy: string;
    status: string;
    notes: string;
}

export interface AddRepairFormProps {
    onClose: () => void;
    onSubmit: (repair: {updateDate: string; errorName: string; occurredDate: string; repairedBy: string; status: string; notes: string}) => void | Promise<void>;
    initialData?: Partial<IRepairDTO>;
}

export interface ISoftwareHistory {
    id: number;
    computer: IComputer;
    softwareName: string;
    installedVersion: string;
    installDate: string;
    installedBy: string;
}

export interface ISoftwareDTO {
    softwareName: string;
    installedVersion: string;
    installDate: string;
    installedBy: string;
}

export interface AddSoftwareFormProps {
    onClose: () => void;
    onSubmit: (software: {softwareName: string; installedVersion: string; installDate: string; installedBy: string}) => void | Promise<void>;
    initialData?: Partial<ISoftwareDTO>;
}

export interface ISemeter {
    id: number;
    semesterName: string;
    startYear: number;
    endYear: number;
}

export interface ISchedule {
    id: number;
    classCode: string;
    subject: string;
    date: number;
    fromPeriod: number;
    toPeriod: number;
    effectiveDate: string;
    notes: string;
    semester: ISemeter;
    users: IUser
    room: IRoom
}

export interface IScheduleChange {
    id: number;
    newDate: number;
    newFromPeriod: number;
    newToPeriod: number;
    reason: string;
    status: string;
    practiceSchedule: ISchedule;
    room: IRoom;
    users: IUser
}

export interface IScheduleChangeDTO {
    newDate: number;
    newFromPeriod: number;
    newToPeriod: number;
    reason: string;
    practiceScheduleId: number;
}