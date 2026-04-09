import { AxiosError } from "axios";

export interface AppError {
    message: string;
    status?: number;
}

export const handleApiError = (error: unknown): AppError => {
    if (error instanceof AxiosError) {
        return {
            message:
                error.response?.data?.message ||
                error.message ||
                "Something went wrong",
            status: error.response?.status,
        };
    }

    return {
        message: "Unexpected error occurred",
    };
};