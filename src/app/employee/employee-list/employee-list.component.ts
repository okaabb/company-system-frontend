import {Component, OnInit, signal, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {EmployeeService} from '../../services/employee.service';
import {ListEmployee} from '../../models/employee.model';
import {Router} from '@angular/router';
import {HttpResponse} from "@angular/common/http";
import {EmployeePaginatedResponse} from "../../models/employee.model";

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'name', 'email', 'position', 'department', 'actions'];
    dataSource = new MatTableDataSource<ListEmployee>();
    totalRecords = 0;
    pageSize = 10;
    pageIndex = 0;
    error = signal('');

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;

    constructor(private employeeService: EmployeeService, private router: Router) {
    }

    ngOnInit(): void {
        this.loadEmployees(this.pageIndex, this.pageSize);
        this.dataSource.paginator = this.paginator;
    }

    loadEmployees(pageIndex: number, pageSize: number): void {
        this.employeeService.getAllEmployees(pageIndex, pageSize).subscribe({
            next: (resData: HttpResponse<EmployeePaginatedResponse>) => {
                this.dataSource.data = resData.body?.content || [];
                this.totalRecords = resData.body?.totalElements || 0;
                this.dataSource.paginator = this.paginator;
            }, error: (error: Error) => {
                this.error.set(error.message);
            },
        });
    }

    onPaginateChange(event: any): void {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.loadEmployees(this.pageIndex, this.pageSize);
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
}
