export interface PageResponse<T> {
    content: T[];
    page: Page;
}

export interface Page {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
}

export interface PageableRequest {
    page?: number;
    size?: number;
    sort?: Sort;
}

export interface Sort {
    field: string;
    direction: 'asc' | 'desc' | '';
}
