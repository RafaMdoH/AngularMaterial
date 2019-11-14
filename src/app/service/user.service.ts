import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${environment.url_Api}/user`);
  }

  register(user: User) {
      return this.http.post(`${environment.url_Api}/user`, user);
  }

  delete(id: number) {
      return this.http.delete(`${environment.url_Api}/user/${id}`);
  }
}
