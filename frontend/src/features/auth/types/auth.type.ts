export interface IUser  {
    _id: string;
    fullname: string;
    email: string;
    contact: string;
    role: "admin" | "seller" | "buyer";
    isVerified: boolean;
    isBlocked: boolean;
}


interface RegisterPayload {
    fullname: string;
    email: string;
    password: string;
    contact: string;
}

interface LoginPayload {
    email: string;
    password: string;
}

interface AuthState {
    user: IUser | null;
    loading: boolean;
    isAuthenticated: boolean;
}

export type { RegisterPayload, LoginPayload, AuthState };