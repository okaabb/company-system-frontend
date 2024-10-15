import {Injectable, signal} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private _errorSubject = new BehaviorSubject<string | null>(null);
  error$ = this._errorSubject.asObservable();

  handleError(error: HttpErrorResponse) {
    this.showError(`Error: ${error.error}`);
  }

  showError(message: string) {
    console.log(message);
    this._errorSubject.next(message);
  }

  clearError() {
    this._errorSubject.next('');
  }
}
