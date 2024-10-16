enum PositionEnum {
    IT, DEV, HR, PO, MANAGER, TEAM_LEAD, CEO,
}

export interface GetEmployeeDetails {
    id: number;
    name: string;
    email: string;
    mobileNumber: string;
    nationalId: string;
    username: string;
    department: string;
    hireDate: Date;
    position: PositionEnum;
}

export interface ListEmployee {
    id: number;
    name: string;
    username: string;
    email: string;
    department: string;
    position: PositionEnum;
}

export interface UpdateEmployee {
    email: string;
    mobileNumber: string;
    nationalId: string;
    username: string;
    password: string;
    department: string;
    hireDate: Date;
    position: PositionEnum;
    name: string;
}

export interface EmployeePaginatedResponse {
    content: ListEmployee[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
}
