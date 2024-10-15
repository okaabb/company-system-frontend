import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {ListApplicantComponent} from "../applicant/applicant-list/list-applicant.component";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  constructor(private router: Router, private authService: AuthService) {
  }

}
