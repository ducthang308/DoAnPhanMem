export interface LoginResponse {
    id: number;
    token: string;
    roles: {
        roleName: string;
    };
    fullName: string;
    status: boolean;
    email: string;
    address: string;
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

    roles: {
        roleName: string;
    };
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