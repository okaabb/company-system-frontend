import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {EmployeeListComponent} from './employee/employee-list/employee-list.component';
import {EmployeeAddComponent} from './employee/employee-add/employee-add.component';
import {EmployeeEditComponent} from './employee/employee-edit/employee-edit.component';
import {EmployeeDetailsComponent} from './employee/employee-details/employee-details.component';
import {HomePageComponent} from "./home-page/home-page.component";
import {ListApplicantComponent} from "./applicant/applicant-list/list-applicant.component";
import {ApplicantDetailsComponent} from "./applicant/applicant-details/applicant-details.component";
import {ApplicantAddComponent} from "./applicant/applicant-add/applicant-add.component";
import {ApplicantEditComponent} from "./applicant/applicant-edit/applicant-edit.component";
import {ApplicantRemoveComponent} from "./applicant/applicant-remove/applicant-remove.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'applicants', component: ListApplicantComponent},
  {path: 'applicants/add', component: ApplicantAddComponent},
  {path: 'applicants/remove/:id', component: ApplicantRemoveComponent},
  {path: 'applicants/edit/:id', component: ApplicantEditComponent},
  {path: 'applicants/:id', component: ApplicantDetailsComponent},
  {path: 'employees', component: EmployeeListComponent},
  {path: 'employees/add', component: EmployeeAddComponent},
  {path: 'employees/edit/:id', component: EmployeeEditComponent},
  {path: 'employees/:id', component: EmployeeDetailsComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
