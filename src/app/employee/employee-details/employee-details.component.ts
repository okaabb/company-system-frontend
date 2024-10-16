import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EmployeeService} from '../../services/employee.service';
import {ListEmployee} from '../../models/employee.model';

@Component({
    selector: 'app-employee-details',
    templateUrl: './employee-details.component.html',
    styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
    employee!: ListEmployee;
    id!: number;

    constructor(
        private route: ActivatedRoute,
        private employeeService: EmployeeService
    ) {
    }

    ngOnInit(): void {
        this.id = +this.route!.snapshot.paramMap.get('id');
        this.employeeService.getEmployeeById(this.id).subscribe({
            next: (resData) => {
                this.employee = resData?.body;
            }
        });
    }
}
