import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './home';


export interface User {
  id: number;
  username: string;
  password: string;
  longestLivingTask: Task;
  longestLivingTaskTime: number;
  totalNumTasks: number;
  tasks: Task[];
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiUrl = 'http://localhost:8000/api/User/';

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  get(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}${id}/`);
  }

  create(data: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, data);
  }

  update(id: number, data: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}${id}/`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
