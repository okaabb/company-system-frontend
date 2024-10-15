import {Injectable} from '@angular/core';
import {catchError, Observable} from 'rxjs';
import {ApplicantComponentModel, ApplicantPaginatedResponse} from "../models/applicant.model";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {ApplicantAddComponent} from "../applicant/applicant-add/applicant-add.component";
import {ErrorService} from "./error.service";

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {
  private baseUrl = '/api/applicants';

  constructor(private httpClient: HttpClient, private errorService: ErrorService) {
  }

  getAllApplicants(pageIndex: number, pageSize: number): Observable<HttpResponse<ApplicantPaginatedResponse>> {
    const url = `${this.baseUrl}?page=${pageIndex}&size=${pageSize}`;
    return this.httpClient.get<ApplicantPaginatedResponse>(url, {observe: 'response'}).pipe(
      catchError(error => {
        this.errorService.handleError(error);
        return [];
      }));
  }

  filterApplicants(filters: Map<string, string>, pageIndex: number, pageSize: number) {
    const queryParams = new URLSearchParams();
    queryParams.append('page', pageIndex.toString());
    queryParams.append('size', pageSize.toString());

    filters.forEach((value, key) => {
      if (value.length > 0)
        queryParams.append(key, value);
    });

    const url = `${this.baseUrl}?${queryParams.toString()}`;

    return this.httpClient.get<ApplicantPaginatedResponse>(url, {observe: 'response'}).pipe(
      catchError(error => {
        this.errorService.handleError(error);
        return [];
      })
    );
  }

  getApplicantById(id: number) {
    const url = `${this.baseUrl}/${id}`;
    console.log(url);
    return this.httpClient.get<ApplicantComponentModel>(url, {observe: 'response'}).pipe(
      catchError(error => {
        this.errorService.handleError(error);
        return [];
      }));
  }

  addApplicant(newApplicant: ApplicantAddComponent) {
    const url = `${this.baseUrl}`;
    return this.httpClient.post<ApplicantComponentModel>(url, newApplicant, {observe: 'response'}).pipe(
      catchError(error => {
        this.errorService.handleError(error);
        return [];
      }));
  }

  updateApplicant(applicantId: number, updatedApplicant: ApplicantComponentModel) {
    const url = `${this.baseUrl}/${applicantId}`;
    updatedApplicant.id = Number(applicantId);
    return this.httpClient.put(url, updatedApplicant).pipe(
      catchError(error => {
        this.errorService.handleError(error);
        return [];
      }));
  }

  deleteApplicant(id: number) {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete(url).pipe(
      catchError(error => {
        this.errorService.handleError(error);
        return [];
      }));
  }
}
