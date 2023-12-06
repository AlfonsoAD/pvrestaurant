import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  protected readonly baseURLFlask = environment.baseURLFlask;

  constructor(private httpClient: HttpClient) {}

  getCSVProducts() {
    const url = `${this.baseURLFlask}products`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.get(url, { headers, withCredentials: true });
  }

  getCSVCategories() {
    const url = `${this.baseURLFlask}categories`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.get(url, { headers, withCredentials: true });
  }

  getPDFProducts() {
    const url = `${this.baseURLFlask}products-pdf`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.get(url, { headers, withCredentials: true });
  }

  getPDFCategories() {
    const url = `${this.baseURLFlask}categories-pdf`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.get(url, { headers, withCredentials: true });
  }
}
