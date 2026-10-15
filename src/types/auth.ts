// Auth user interface
export interface AuthUser {
    name: string;
    email: string;
}

// Login credentials interface
export interface LoginCredentials {
    email: string;
    password: string;
}

// Login response interface
export interface LoginResponse {
    success: boolean;
    message: string;
    user: AuthUser;
}

// Current auth user interface
export interface CurrentUserResponse {
    success: boolean;
    user: AuthUser;
}