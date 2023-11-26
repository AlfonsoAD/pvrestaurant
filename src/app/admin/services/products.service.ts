import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { dataURLtoBlob } from '../../helpers/functions.helper';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  protected readonly baseURL = environment.baseURL;

  constructor(private httpClient: HttpClient) {}

  getProducts() {
    const url = `${this.baseURL}products/`;
    const headers = new HttpHeaders();
    return this.httpClient.get(url, { headers });
  }

  postProduct(product: any, image?: string) {
    const { name, description, price, category } = product;
    const isActive = 'true';
    const foto = image ? dataURLtoBlob(image) : '';
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('is_active', isActive);
    formData.append('image', foto);

    const url = `${this.baseURL}products/`;
    const headers = new HttpHeaders();
    return this.httpClient.post(url, formData, { headers });
  }

  putProduct(product: any, image?: string) {
    const { id, name, description, price, category } = product;
    const isActive = 'true';
    const foto = image ? dataURLtoBlob(image) : '';
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('is_active', isActive);
    formData.append('image', foto);

    const url = `${this.baseURL}products/${id}/`;
    const headers = new HttpHeaders();
    return this.httpClient.put(url, formData, { headers }).pipe(
      take(1),
      map((res: any) => res.ok)
    );
  }

  deleteProduct(id: number) {
    const url = `${this.baseURL}products/${id}/`;
    const headers = new HttpHeaders();
    return this.httpClient.delete(url, { headers });
  }
}
