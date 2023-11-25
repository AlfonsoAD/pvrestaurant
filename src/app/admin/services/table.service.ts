import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  protected readonly BASE_URL = environment.baseURL;

  constructor(private httpClient: HttpClient) {}

  getTables() {
    const url = `${this.BASE_URL}tables/`;
    const headers = new HttpHeaders();
    return this.httpClient.get(url, { headers });
  }

  postTable(table: any) {
    const url = `${this.BASE_URL}tables/`;
    const headers = new HttpHeaders();
    return this.httpClient.post(url, table, { headers }).pipe(
      take(1),
      map((response: any) => response.ok)
    );
  }

  putTable(table: any) {
    const url = `${this.BASE_URL}tables/${table.id}/`;
    const headers = new HttpHeaders();
    return this.httpClient.put(url, table, { headers }).pipe(
      take(1),
      map((response: any) => response.ok)
    );
  }

  deleteTable(idTable: number) {
    const url = `${this.BASE_URL}tables/${idTable}/`;
    const headers = new HttpHeaders();
    return this.httpClient.delete(url, { headers }).pipe(
      take(1),
      map((response: any) => response.ok)
    );
  }
}
