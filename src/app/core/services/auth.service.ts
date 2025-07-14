import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../../shared/models/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = 'api/auth';
  private readonly TOKEN_KEY = 'auth_token';

  // Signal to track authentication state
  private readonly _isAuthenticated: WritableSignal<boolean> = signal(this.hasValidToken());
  readonly isAuthenticated = this._isAuthenticated.asReadonly();

  constructor() {
    // Initialize authentication state from localStorage
    this._isAuthenticated.set(this.hasValidToken());
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((response) => {
        this.setToken(response.token);
        this._isAuthenticated.set(true);
      })
    );
  }

  logout(): void {
    this.removeToken();
    this._isAuthenticated.set(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  private hasValidToken(): boolean {
    const token = this.getToken();
    return !!token;
  }
}
