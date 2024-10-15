import {Component, OnInit, signal} from '@angular/core';
import {ApplicantService} from "../../services/applicant.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-applicant-remove',
  templateUrl: './applicant-remove.component.html',
  styleUrls: ['./applicant-remove.component.css']
})
export class ApplicantRemoveComponent implements OnInit {
  applicantId!: number;
  error = signal('');

  constructor(
    private applicantService: ApplicantService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.applicantId = this.route.snapshot.params['id'];
  }

  deleteApplicant() {
    this.applicantService.deleteApplicant(this.applicantId).subscribe({
      next: () => {
        this.router.navigate(['/applicants']);
      }, error: (error: Error) => {
        this.error.set(error.message);
      },
    });
  }

  abortDelete() {
    this.router.navigate(['/applicants']);
  }
}
