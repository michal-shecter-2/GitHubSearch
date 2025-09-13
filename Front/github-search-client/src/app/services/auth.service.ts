import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoginModel } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7196/api/auth';
  private readonly TOKEN_NAME = 'jwt_token';
  private _isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: LoginModel): Observable<any> {
    return this.http.post<{token: string}>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem(this.TOKEN_NAME, response.token);
        this._isLoggedIn$.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_NAME);
    this._isLoggedIn$.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_NAME);
  }
}