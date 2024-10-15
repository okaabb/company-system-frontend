import {Injectable} from '@angular/core';
import {catchError, map, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {LoginResponse, LoginRequest} from "../models/login.model";
import {ErrorService} from "./error.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private loginUrl = '/api/login';
  private loginRequest: LoginRequest = {username: '', password: ''};

  constructor(private httpClient: HttpClient, private errorService: ErrorService) {
  }

  login(username: string, password: string) {
    this.loginRequest.username = username;
    this.loginRequest.password = password;
    return this.httpClient.post<LoginResponse>(this.loginUrl, this.loginRequest).pipe(
      tap((response) => {
        if (response && response.token) {
          this.isAuthenticated = true;
          localStorage.setItem('token', response.token);
        }
      }),      catchError(error => {
        this.errorService.handleError(error);
        throw error;
      })
    );
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('token');

  }

  isLoggedIn(): boolean {
    return this.isAuthenticated || !!localStorage.getItem('token');
  }
}
