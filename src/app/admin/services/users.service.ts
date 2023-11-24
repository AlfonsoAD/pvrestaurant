import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, take } from 'rxjs';
import { dataURLtoBlob } from '../../helpers/functions.helper';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  protected readonly BASE_URL = environment.baseURL;

  constructor(private httpClient: HttpClient) {}

  getUsers() {
    const url = `${this.BASE_URL}users/`;
    const headers = new HttpHeaders();
    return this.httpClient.get(url, { headers }).pipe(
      take(1),
      map((response: any) => {
        if (response.ok) return response.results;
      })
    );
  }

  postUser(user: any, picture?: string) {
    const { first_name, last_name, username, email, password, roles } = user;
    const foto = picture ? dataURLtoBlob(picture) : null;
    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('roles', roles);
    if (foto) formData.append('image', foto);

    const url = `${this.BASE_URL}auth/register`;
    const headers = new HttpHeaders();
    return this.httpClient.post(url, formData, { headers }).pipe(
      take(1),
      map((response: any) => {
        if (response.ok) return response.ok;
      })
    );
  }

  putUser(user: any, picture?: string) {
    const { first_name, last_name, username, email, roles } = user;
    const foto = picture ? dataURLtoBlob(picture) : null;
    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('roles', roles);
    if (foto) formData.append('image', foto);

    const url = `${this.BASE_URL}users/${user.id}/`;
    const headers = new HttpHeaders();
    return this.httpClient.put(url, formData, { headers }).pipe(
      take(1),
      map((response: any) => {
        if (response.ok) return response.ok;
      })
    );
  }

  putPassword(id: number, password: string) {
    const url = `${this.BASE_URL}auth/changepassword/${id}/`;
    const headers = new HttpHeaders();
    return this.httpClient.put(url, { password }, { headers }).pipe(
      take(1),
      map((response: any) => {
        if (response.ok) return response.ok;
      })
    );
  }

  deleteUser(id: number) {
    const url = `${this.BASE_URL}users/${id}/`;
    const headers = new HttpHeaders();
    return this.httpClient.delete(url, { headers }).pipe(
      take(1),
      map((response: any) => {
        if (response.ok) return response.results;
      })
    );
  }
}
