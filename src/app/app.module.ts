import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {EmployeeListComponent} from './employee/employee-list/employee-list.component';
import {EmployeeAddComponent} from './employee/employee-add/employee-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EmployeeEditComponent} from './employee/employee-edit/employee-edit.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EmployeeDetailsComponent} from './employee/employee-details/employee-details.component';
import {ListApplicantComponent} from './applicant/applicant-list/list-applicant.component';
import {HomePageComponent} from './home-page/home-page.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ApplicantAddComponent } from './applicant/applicant-add/applicant-add.component';
import { ApplicantDetailsComponent } from './applicant/applicant-details/applicant-details.component';
import { ApplicantEditComponent } from './applicant/applicant-edit/applicant-edit.component';
import { ApplicantRemoveComponent } from './applicant/applicant-remove/applicant-remove.component';
import {ModalComponent} from "./shared/modal/modal.component";
import {ErrorModalComponent} from "./shared/modal/error-modal/error-modal.component";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {HttpTokenInterceptor} from "./interceptor/http-token.interceptor";
import { LogoutComponent } from './logout/logout.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { NavbarComponent } from './navbar/navbar.component';
import {MatSidenavModule} from "@angular/material/sidenav";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeeListComponent,
    EmployeeAddComponent,
    EmployeeEditComponent,
    EmployeeDetailsComponent,
    ListApplicantComponent,
    HomePageComponent,
    ApplicantAddComponent,
    ApplicantDetailsComponent,
    ApplicantEditComponent,
    ApplicantRemoveComponent,
    LogoutComponent,
    NavbarComponent
  ],
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ModalComponent,
    ErrorModalComponent,
    MatSelectModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
