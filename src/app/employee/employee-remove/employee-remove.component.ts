import {Component, OnInit, signal} from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-employee-remove',
  templateUrl: './employee-remove.component.html',
  styleUrls: ['./employee-remove.component.css']
})
export class EmployeeRemoveComponent implements OnInit {
  employeeId!: number;
  error = signal('');

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.employeeId = this.route.snapshot.params['id'];
  }

  deleteEmployee() {
    this.employeeService.deleteEmployee(this.employeeId).subscribe({
      next: () => {
        this.router.navigate(['/employees']);
      }, error: (error: Error) => {
        this.error.set(error.message);
      },
    });
  }

  abortDelete() {
    this.router.navigate(['/employees']);
  }
}
