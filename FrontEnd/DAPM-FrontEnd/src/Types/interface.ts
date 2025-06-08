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