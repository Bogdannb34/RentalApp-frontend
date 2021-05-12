import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomHttpResponse } from '../model/custom-http-response';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`/server/user/list`);
  }

  public addUser(formData: FormData): Observable<User> {
    return this.http.post<User>(`/server/user/add`, formData);
  }

  public updateUser(formData: FormData): Observable<User> {
    return this.http.put<User>(`/server/user/update`, formData);
  }

  public resetPassword(email: string): Observable<CustomHttpResponse> {
    return this.http.get<CustomHttpResponse>(`/server/user/resetPassword/${email}`);
  }

  public updateProfileImage(formData: FormData): Observable<HttpEvent<User>> {
    return this.http.post<User>(`/server/user/updateProfileImage`, formData,
    {
      reportProgress: true,
      observe: 'events'
    });
  }

  public deleteUser(userId: number): Observable<CustomHttpResponse> {
    return this.http.delete<CustomHttpResponse>(`/server/user/delete/${userId}`);
  }

  public addUsersToLocalCache(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  public getUsersFromLocalCache(): User[] {
    if (localStorage.getItem('users')) {
      return JSON.parse(localStorage.getItem('users'));
    }
    return null;
  }

  public createUserFormData(loggedInUsername: string, user: User, profileImage: File): FormData {
    const formData = new FormData();
    formData.append('currentUsername', loggedInUsername);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('role', user.role);
    formData.append('phoneNumber', user.phoneNumber);
    formData.append('profileImage', profileImage);
    formData.append('isActive', JSON.stringify(user.active));
    formData.append('isNotLocked', JSON.stringify(user.notLocked));
    return formData;
  } 
}
