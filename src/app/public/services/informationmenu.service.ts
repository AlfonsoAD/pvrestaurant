import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class informationmenuService {
  protected readonly baseURL = environment.baseURL;

  constructor(private httpClient: HttpClient) {}

  getMenusDetails(id: string) {
    const url = `${this.baseURL}productsMenu/${id}`;
    const headers = new HttpHeaders();
    return this.httpClient.get(url, { headers });
  }
}