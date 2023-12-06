import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DetailMenuService {
  protected readonly baseURL = environment.baseURL;

  constructor(private httpClient: HttpClient) {}

  getDetailsMenu() {
    const url = `${this.baseURL}details_menu`;
    const headers = new HttpHeaders();
    return this.httpClient.get(url, { headers });
  }

  postDetailsMenu(data: any) {
    const url = `${this.baseURL}details_menu/`;
    const headers = new HttpHeaders();
    return this.httpClient.post(url, data, { headers }).pipe(
      take(1),
      map((response: any) => response.ok)
    );
  }
}
