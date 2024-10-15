import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { delay, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employees: Employee[] = [];

  constructor() {
    this.generateEmployees();
  }

  getEmployees(pageIndex: number, pageSize: number): { data: Employee[], total: number } {
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    const data = this.employees.slice(startIndex, endIndex);
    const total = this.employees.length;
    return { data, total };
  }

  addEmployee(employee: any) {
    return of(employee).pipe(
      delay(5000),
      tap(newEmployee => this.employees.push(newEmployee))
    );
  }

  getEmployeeById(id: number) {
    return this.employees.find(emp => emp.id == id);
  }

  updateEmployee(id: number, updatedEmployee: any) {
    const index = this.employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      this.employees[index] = { ...updatedEmployee, id };
    }
  }

  deleteEmployee(id: number): void {
    this.employees = this.employees.filter(emp => emp.id !== id);
  }

  generateEmployees(): void {
    const departments = ['Development', 'IT', 'HR', 'PO', 'Management'];
    const positions = ['Fresh', 'Mid-level', 'Senior'];
    for (let i = 1; i <= 100; i++) {
      const employee: Employee = {
        id: i,
        name: `Employee ${i}`,
        email: `employee${i}@company.com`,
        department: departments[Math.floor(Math.random() * departments.length)],
        position: positions[Math.floor(Math.random() * positions.length)],
      };
      this.employees.push(employee);
    }
  }
}
