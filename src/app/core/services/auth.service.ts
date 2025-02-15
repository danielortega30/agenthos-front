import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.access_token);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  register(userData: {
    username: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/register`, userData);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
