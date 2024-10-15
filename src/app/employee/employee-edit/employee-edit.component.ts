import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {EmployeeService} from '../../services/employee.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent {
  employeeForm!: FormGroup;
  departments = ['Development', 'IT', 'HR', 'PO', 'Management'];
  employeeId!: number;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.params['id'];
    const employee = this.employeeService.getEmployeeById(this.employeeId);
    console.log(employee);

    this.employeeForm = new FormGroup({
      name: new FormControl(employee!.name, [Validators.required]),
      email: new FormControl(employee!.email, [Validators.required, Validators.email]),
      department: new FormControl(employee!.department, [Validators.required]),
      position: new FormControl(employee!.position, [Validators.required])
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const updatedEmployee = this.employeeForm.value;
      this.employeeService.updateEmployee(this.employeeId, updatedEmployee);
      this.router.navigate(['/list']);
    }
  }
}
