import {Component, signal} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {ActivatedRoute, Router} from "@angular/router";
import {ApplicantService} from "../../services/applicant.service";
import {ApplicantComponentModel} from "../../models/applicant.model";

@Component({
  selector: 'app-applicant-edit',
  templateUrl: './applicant-edit.component.html',
  styleUrls: ['./applicant-edit.component.css']
})
export class ApplicantEditComponent {
  applicantForm!: FormGroup;
  applicantId!: number;
  applicant!: ApplicantComponentModel;
  isLoading = true;

  constructor(
    private applicantService: ApplicantService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.applicantId = this.route.snapshot.params['id'];
    this.applicantService.getApplicantById(this.applicantId).subscribe({
      next: (resData) => {
        this.applicant = resData.body!;
      },
      complete: () => {
        console.log(this.applicant.name);
        this.applicantForm = new FormGroup({
          name: new FormControl(this.applicant!.name, [Validators.required]),
          email: new FormControl(this.applicant!.email, [Validators.required, Validators.email]),
          mobileNumber: new FormControl(this.applicant!.mobileNumber, [Validators.required]),
        });
        this.isLoading = false;
      }
    });

  }

  onSubmit(): void {
    if (this.applicantForm.valid) {
      const updatedApplicant = this.applicantForm.value;
      updatedApplicant.id = this.applicantId;
      this.applicantService.updateApplicant(this.applicantId, updatedApplicant).subscribe({
        next: () => {
          this.router.navigate(['/applicants']); // Navigate only on successful update
        }
      });
    }
  }
}
