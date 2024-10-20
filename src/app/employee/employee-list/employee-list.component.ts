import {Component, OnInit, signal, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {EmployeeService} from '../../services/employee.service';
import {ListEmployee} from '../../models/employee.model';
import {Router} from '@angular/router';
import {HttpResponse} from "@angular/common/http";
import {EmployeePaginatedResponse} from "../../models/employee.model";
import {ApplicantPaginatedResponse} from "../../models/applicant.model";

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'name', 'email', 'position', 'department', 'actions'];
    dataSource = new MatTableDataSource<ListEmployee>();
    totalRecords:number = 0;
    pageSize = 5;
    pageIndex = 0;
    error = signal('');

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    private currentFilterColumn: string;
    private map: any;

    constructor(private employeeService: EmployeeService, private router: Router) {
    }

    ngOnInit(): void {
        this.loadEmployees();
    }

    loadEmployees(): void {
        this.employeeService.getAllEmployees(this.pageIndex, this.pageSize).subscribe({
            next: (resData: HttpResponse<EmployeePaginatedResponse>) => {
                this.dataSource.data = resData.body?.content || [];
                this.totalRecords = resData.body?.totalElements || 0;
            }, error: (error: Error) => {
                this.error.set(error.message);
            },
        });
    }

    onPaginateChange(event: PageEvent): void {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.loadEmployees();
    }

    addEmployee() {
        this.router.navigate(['/employees/add']);
    }

    editEmployee(id: number): void {
        this.router.navigate(['/employees/edit', id]);
    }

    deleteEmployee(id: number): void {
        this.router.navigate(['/employees/remove', id]);
    }

    viewEmployeeDetails(row: any): void {
        this.router.navigate(['/employees/', row.id]);
    }

    filterByColumn(event: Event, column: string): void {
        const input = event.target as HTMLInputElement;
        const filterValue = input.value.trim().toLowerCase();

        this.currentFilterColumn = column;

        this.map.set(this.currentFilterColumn, filterValue);

        this.employeeService.filterEmployees(this.map, this.pageIndex, this.pageSize).subscribe({
            next: (resData: HttpResponse<EmployeePaginatedResponse>) => {
                this.dataSource.data = resData.body?.content || [];
                this.totalRecords = resData.body?.totalElements || 0;
                this.dataSource.paginator = this.paginator;
            }, error: (error: Error) => {
                this.error.set(error.message);
            },
        });
    }
}
