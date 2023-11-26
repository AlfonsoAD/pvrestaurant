import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  protected readonly baseURL = environment.baseURL;

  constructor(private httpClient: HttpClient) {}

  getCategories() {
    const url = `${this.baseURL}categorys/`;
    const headers = new HttpHeaders();
    return this.httpClient.get(url, { headers });
  }

  postCategory(category: any) {
    const url = `${this.baseURL}categorys/`;
    const headers = new HttpHeaders();
    return this.httpClient.post(url, category, { headers }).pipe(
      take(1),
      map((response: any) => response.ok)
    );
  }

  putCategory(category: any) {
    const url = `${this.baseURL}categorys/${category.id}/`;
    const headers = new HttpHeaders();
    return this.httpClient.put(url, category, { headers }).pipe(
      take(1),
      map((response: any) => response.ok)
    );
  }

  deleteCategory(idCategory: number) {
    const url = `${this.baseURL}categorys/${idCategory}/`;
    const headers = new HttpHeaders();
    return this.httpClient.delete(url, { headers });
  }
}
