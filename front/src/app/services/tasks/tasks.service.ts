import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
// Types
import { Task, TaskPayload } from '../../models/task';


@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private baseURL: string = environment.dev.apiUrl + '/tasks/';

  constructor(private http: HttpClient) {}

  getList(email: string) {
    return this.http.get<Task[]>(this.baseURL+'?email='+email);
  }

  createTask(task: TaskPayload) {
    return this.http.post<Task>(this.baseURL, task);
  }

  updateTask(id: string, task: TaskPayload) {
    return this.http.put<Task>(this.baseURL + id, task);
  }

  deleteTask(id: string) {
    return this.http.delete<Task>(this.baseURL + id);
  }
}
