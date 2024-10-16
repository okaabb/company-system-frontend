import {Injectable} from '@angular/core';
import {catchError, Observable} from 'rxjs';
import {EmployeeComponentModel, EmployeePaginatedResponse} from "../models/employee.model";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {EmployeeAddComponent} from "../employee/employee-add/employee-add.component";
import {ErrorService} from "./error.service";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private baseUrl = '/api/employees';

    constructor(private httpClient: HttpClient, private errorService: ErrorService) {
    }

    getAllEmployees(pageIndex: number, pageSize: number): Observable<HttpResponse<EmployeePaginatedResponse>> {
        const url = `${this.baseUrl}?page=${pageIndex}&size=${pageSize}`;
        return this.httpClient.get<EmployeePaginatedResponse>(url, {observe: 'response'}).pipe(
            catchError(error => {
                this.errorService.handleError(error);
                return [];
            }));
    }

    filterEmployees(filters: Map<string, string>, pageIndex: number, pageSize: number) {
        const queryParams = new URLSearchParams();
        queryParams.append('page', pageIndex.toString());
        queryParams.append('size', pageSize.toString());

        filters.forEach((value, key) => {
            if (value.length > 0)
                queryParams.append(key, value);
        });

        const url = `${this.baseUrl}?${queryParams.toString()}`;

        return this.httpClient.get<EmployeePaginatedResponse>(url, {observe: 'response'}).pipe(
            catchError(error => {
                this.errorService.handleError(error);
                return [];
            })
        );
    }

    getEmployeeById(id: number) {
        const url = `${this.baseUrl}/${id}`;
        console.log(url);
        return this.httpClient.get<EmployeeComponentModel>(url, {observe: 'response'}).pipe(
            catchError(error => {
                this.errorService.handleError(error);
                return [];
            }));
    }

    addEmployee(newEmployee: EmployeeAddComponent) {
        const url = `${this.baseUrl}`;
        return this.httpClient.post<EmployeeComponentModel>(url, newEmployee, {observe: 'response'}).pipe(
            catchError(error => {
                this.errorService.handleError(error);
                return [];
            }));
    }

    updateEmployee(employeeId: number, updatedEmployee: EmployeeComponentModel) {
        const url = `${this.baseUrl}/${employeeId}`;
        updatedEmployee.id = Number(employeeId);
        return this.httpClient.put(url, updatedEmployee).pipe(
            catchError(error => {
                this.errorService.handleError(error);
                return [];
            }));
    }

    deleteEmployee(id: number) {
        const url = `${this.baseUrl}/${id}`;
        return this.httpClient.delete(url).pipe(
            catchError(error => {
                this.errorService.handleError(error);
                return [];
            }));
    }
}
