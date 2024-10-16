export interface EmployeeComponentModel {
    id: number;
    name: string;
    email: string;
    mobileNumber: string;
}

export interface EmployeePaginatedResponse {
    content: EmployeeComponentModel[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
}
