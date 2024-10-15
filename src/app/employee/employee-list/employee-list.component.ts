import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'position', 'department', 'actions'];
  dataSource = new MatTableDataSource<Employee>();
  totalRecords = 0;
  pageSize = 10;
  pageIndex = 0;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.loadEmployees();
    this.dataSource.paginator = this.paginator;
  }

  loadEmployees(): void {
    const { data, total } = this.employeeService.getEmployees(this.pageIndex, this.pageSize);
    this.dataSource.data = data;
    this.totalRecords = total;
  }

  onPaginateChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadEmployees();
  }

  addEmployee() {
    this.router.navigate(['/add']);
  }

  editEmployee(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id);
  }

  viewEmployeeDetails(row: any): void {
    this.router.navigate(['/details', row.id]);
  }
}
