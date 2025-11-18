export interface InvalidField {
    field: string;
    errorMessage: string;
}

export interface ApiError {
    type: string;
    title: string;
    status: number;
    detail: string;
    instance: string;
}

export interface ValidationError extends ApiError {
    invalidFields: InvalidField[];
}
