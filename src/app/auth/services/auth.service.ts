import { Injectable, signal, computed } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, take, tap } from 'rxjs';
import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  protected readonly BASE_URL = environment.baseURL;
  private _user = signal<User | null>(null);
  public user = computed(() => this._user());

  get token(): string | null {
    return localStorage.getItem('token');
  }

  get statusAuth() {
    return localStorage.getItem('authStatus');
  }

  constructor(private httpClient: HttpClient) {}

  private isLogout(): boolean {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh-token');
    localStorage.removeItem('authStatus');
    return true;
  }

  postLogin(body: {
    email: string;
    password: string;
  }): Observable<Response | any> {
    const url = `${this.BASE_URL}auth/login`;
    const headers = new HttpHeaders();
    return this.httpClient.post(url, body, { headers }).pipe(
      take(1),
      tap((response: any) => {
        const { access, refresh, user } = response.results;
        localStorage.setItem('token', access);
        localStorage.setItem('refresh-token', refresh);
        this._user.set(user[0]);
      }),
      tap(() => {
        localStorage.setItem('authStatus', 'authenticated');
      })
    );
  }

  validateToken(): Observable<boolean> {
    const url = `${this.BASE_URL}auth/renew`;
    const headers = new HttpHeaders();
    return this.httpClient.get(url, { headers }).pipe(
      map((response: any) => {
        const user = response.results;
        this._user.set(user);
        return response.ok;
      }),
      catchError(() => of(false))
    );
  }

  logout(): boolean {
    return this.isLogout();
  }
}
