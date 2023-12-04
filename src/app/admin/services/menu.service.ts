import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { take, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  protected readonly baseURL = environment.baseURL;

  constructor(private httpClient: HttpClient) {}

  getMenus() {
    const url = `${this.baseURL}menu`;
    const headers = new HttpHeaders();
    return this.httpClient.get(url, { headers });
  }

  postMenu(body: any) {
    const url = `${this.baseURL}menu/`;
    const headers = new HttpHeaders();
    return this.httpClient.post(url, body, { headers }).pipe(
      take(1),
      map((response: any) => response.ok)
    );
  }

  putMenu(body: any) {
    const url = `${this.baseURL}menu/${body.id}/`;
    const headers = new HttpHeaders();
    return this.httpClient.put(url, body, { headers }).pipe(
      take(1),
      map((response: any) => response.ok)
    );
  }

  deleteMenu(id: number) {
    const url = `${this.baseURL}menu/${id}/`;
    const headers = new HttpHeaders();
    return this.httpClient.delete(url, { headers }).pipe(
      take(1),
      map((response: any) => response.ok)
    );
  }
}
