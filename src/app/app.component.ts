import {Component, inject, ViewChild} from '@angular/core';
import {ErrorService} from "./services/error.service";
import {NavbarComponent} from "./navbar/navbar.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Company System';
  error$ = this.errorService.error$;
  @ViewChild(NavbarComponent) navbar!: NavbarComponent;

  constructor(private router: Router, private errorService: ErrorService) {
  }

  listApplicants() {
    this.router.navigate(['/applicants']);
  }
  listEmployees() {
    this.router.navigate(['/employees']);
  }
}
