import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  protected readonly baseURL = environment.baseURL;

  constructor(private httpClient: HttpClient) {}

  getMenus() {
    const url = `${this.baseURL}public/menus`;
    const headers = new HttpHeaders().set("skipToken", 'true');
    return this.httpClient.get(url, { headers });
  }
}