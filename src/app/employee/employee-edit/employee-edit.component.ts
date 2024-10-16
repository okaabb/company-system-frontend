import {Component, signal} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../../services/employee.service";
import {UpdateEmployee} from "../../models/employee.model";

@Component({
    selector: 'app-employee-edit',
    templateUrl: './employee-edit.component.html',
    styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent {
    employeeForm!: FormGroup;
    employeeId!: number;
    employee!: UpdateEmployee;
    isLoading = true;

    constructor(
        private employeeService: EmployeeService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.employeeId = this.route.snapshot.params['id'];
        this.employeeService.getEmployeeById(this.employeeId).subscribe({
            next: (resData) => {
                this.employee = resData.body!;
            },
            complete: () => {
                console.log(this.employee.name);
                this.employeeForm = new FormGroup({
                    name: new FormControl(this.employee!.name, [Validators.required]),
                    email: new FormControl(this.employee!.email, [Validators.required, Validators.email]),
                    mobileNumber: new FormControl(this.employee!.mobileNumber, [Validators.required]),
                });
                this.isLoading = false;
            }
        });

    }

    onSubmit(): void {
        if (this.employeeForm.valid) {
            const updatedEmployee = this.employeeForm.value;
            updatedEmployee.id = this.employeeId;
            this.employeeService.updateEmployee(this.employeeId, updatedEmployee).subscribe({
                next: () => {
                    this.router.navigate(['/employees']); // Navigate only on successful update
                }
            });
        }
    }
}
