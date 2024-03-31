import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _HttpClient: HttpClient) {}
  getAllUsers(params: any): Observable<any> {
    return this._HttpClient.get('users', { params: params });
  }

  getUserById(id: number): Observable<any> {
    return this._HttpClient.get(`users/${id}`);
  }
}
