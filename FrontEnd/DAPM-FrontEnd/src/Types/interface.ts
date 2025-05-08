export interface LoginResponse {
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