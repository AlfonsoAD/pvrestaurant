import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  protected readonly baseURL = environment.baseURL;

  constructor(private httpClient: HttpClient) {}

  getOrders() {
    const url = `${this.baseURL}orders/`;
    const headers = new HttpHeaders();
    return this.httpClient.get(url, { headers });
  }

  postOrder(body: any) {
    const url = `${this.baseURL}orders/`;
    const headers = new HttpHeaders();
    return this.httpClient.post(url, body, { headers });
  }

  patchOrder(id: number, body: any) {
    const url = `${this.baseURL}orders/${id}/`;
    const headers = new HttpHeaders();
    return this.httpClient.patch(url, body, { headers }).pipe(
      take(1),
      map((response: any) => response.ok)
    );
  }

  deleteOrder(id: number) {
    const url = `${this.baseURL}orders/${id}/`;
    const headers = new HttpHeaders();
    return this.httpClient.delete(url, { headers }).pipe(
      take(1),
      map((response: any) => response.ok)
    );
  }

  // Details order
  getDetailsOrder(id: number) {
    const url = `${this.baseURL}detailsOrder/${id}`;
    const headers = new HttpHeaders();
    return this.httpClient.get(url, { headers });
  }

  postDetailOrder(body: any) {
    const url = `${this.baseURL}details_order/`;
    const headers = new HttpHeaders();
    return this.httpClient.post(url, body, { headers });
  }

  patchDetailOrder(id: number, body: any) {
    const url = `${this.baseURL}details_order/${id}/`;
    const headers = new HttpHeaders();
    return this.httpClient.patch(url, body, { headers }).pipe(
      take(1),
      map((response: any) => response.ok)
    );
  }

  deleteDetailOrder(id: number) {
    const url = `${this.baseURL}details_order/${id}/`;
    const headers = new HttpHeaders();
    return this.httpClient.delete(url, { headers }).pipe(
      take(1),
      map((response: any) => response.ok)
    );
  }
}
