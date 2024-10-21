import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, of, tap, throwError } from 'rxjs';

import { TokenResponse } from './models/token-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static readonly LOGIN_URL = `/identity/realms/fintatech/protocol/openid-connect/token`;

  private http = inject(HttpClient);

  private _token: string | null = null;
  private _refreshToken: string | null = null;
  private _tokenExpirationDate: Date | null = null;
  private _refreshTokenExpirationDate: Date | null = null;

  constructor() {
    this.loadTokensFromStorage();
  }

  getAccessToken(): string | null {
    return this._token || localStorage.getItem('access_token');
  }

  login(username: string, password: string): Observable<TokenResponse> {
    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('client_id', 'app-cli');
    body.set('username', username);
    body.set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http
      .post<TokenResponse>(AuthService.LOGIN_URL, body.toString(), { headers })
      .pipe(tap(res => this.handleTokenResponse(res)));
  }

  refreshTokenIfNeeded(): Observable<string> {
    if (this.isTokenValid()) {
      return of(this._token as string);
    } else if (this._refreshToken) {
      return this.requestNewAccessToken();
    } else {
      return throwError(() => new Error('Token expired, please log in again.'));
    }
  }

  private handleTokenResponse(res: TokenResponse) {
    this._token = res.access_token;
    this._refreshToken = res.refresh_token;
    this._tokenExpirationDate = this.calculateTokenExpiration(res.expires_in);
    this._refreshTokenExpirationDate = this.calculateTokenExpiration(res.refresh_expires_in);
    this.storeTokens(this._token, this._refreshToken, this._tokenExpirationDate, this._refreshTokenExpirationDate);
  }

  private requestNewAccessToken(): Observable<string> {
    const body = {
      grant_type: 'refresh_token',
      client_id: 'app-cli',
      refresh_token: this._refreshToken,
    };

    return this.http.post<TokenResponse>(AuthService.LOGIN_URL, body).pipe(
      tap(res => this.handleTokenResponse(res)),
      map(res => res.access_token)
    );
  }

  private isTokenValid(): boolean {
    return !!this._token && !!this._tokenExpirationDate && new Date() < this._tokenExpirationDate;
  }

  private calculateTokenExpiration(expiresIn: number): Date {
    const currentTime = new Date();
    return new Date(currentTime.getTime() + expiresIn * 1000);
  }

  private storeTokens(token: string, refreshToken: string, expiration: Date, refreshExpiration: Date) {
    localStorage.setItem('access_token', token);
    localStorage.setItem('refresh_token', refreshToken);
    localStorage.setItem('token_expiration', expiration.toString());
    localStorage.setItem('refresh_token_expiration', refreshExpiration.toString());
  }

  private loadTokensFromStorage() {
    this._token = localStorage.getItem('access_token');
    this._refreshToken = localStorage.getItem('refresh_token');

    const expiration = localStorage.getItem('token_expiration');
    if (expiration) {
      this._tokenExpirationDate = new Date(expiration);
    }
    const refreshTokenExpiration = localStorage.getItem('refresh_token_expiration');
    if (refreshTokenExpiration) {
      this._tokenExpirationDate = new Date(refreshTokenExpiration);
    }
  }
}
