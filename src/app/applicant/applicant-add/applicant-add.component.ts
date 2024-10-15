import {Component, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApplicantService} from "../../services/applicant.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-applicant-add',
  templateUrl: './applicant-add.component.html',
  styleUrls: ['./applicant-add.component.css']
})
export class ApplicantAddComponent implements OnInit {
  applicantForm!: FormGroup;

  constructor(private applicantService: ApplicantService, private router: Router) {
  }

  ngOnInit(): void {
    this.applicantForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobileNumber: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.applicantForm.valid) {
      const newApplicant = this.applicantForm.value;
      this.applicantService.addApplicant(newApplicant).subscribe({
        next: () => {
          this.router.navigate(['/applicants'])
        }
      });

    }
  }
}
