export interface ActionResponse<T = null> {
    success: boolean;
    message: string;
    data?: T;
}

export function success<T>(message: string, data?: T): ActionResponse<T> {
    return {
        success: true,
        message,
        data,
    };
}

export function failed(message: string): ActionResponse {
    return {
        success: false,
        message,
    };
}
