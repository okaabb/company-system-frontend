import {Component, OnInit, signal} from '@angular/core';
import {Employee} from "../../models/employee.model";
import {ActivatedRoute} from "@angular/router";
import {ApplicantService} from "../../services/applicant.service";
import {ApplicantComponentModel} from "../../models/applicant.model";

@Component({
  selector: 'app-applicant-details',
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.css']
})
export class ApplicantDetailsComponent implements OnInit {
  applicant!: ApplicantComponentModel;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private applicantService: ApplicantService
  ) {
  }

  ngOnInit(): void {
    this.id = +this.route!.snapshot.paramMap.get('id');
    this.applicantService.getApplicantById(this.id).subscribe({
      next: (resData) => {
        this.applicant = resData?.body;
      }
    });
  }
}
