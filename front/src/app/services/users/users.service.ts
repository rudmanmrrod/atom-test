import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
// Type
import type { User, UserResponse } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseURL: string = environment.dev.apiUrl + '/users/';

  constructor(private http: HttpClient) {}

  public checkUser(email: string) {
    return this.http.get<User[]>(this.baseURL + email);
  }

  public createUser(email: string) {
    return this.http.post<UserResponse>(this.baseURL, {email})
  }

  public getUserEmail() {
    return localStorage.getItem('userEmail') || '';
  }
}