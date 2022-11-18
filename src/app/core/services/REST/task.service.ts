import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(
    private _http: HttpClient,
    @Inject('SERVER_URL') private _serverUrl: string
  ) {}

  public getAllTasks(): Observable<Task.Model[]> {
    const _url = `${this._serverUrl}/api/tasks`;

    return this._http.get<Task.Model[]>(_url);
  }

  public completedTasks(): Observable<Task.Model[]> {
    const _url = `${this._serverUrl}/api/compeleted`;

    return this._http.get<Task.Model[]>(_url);
  }

  public addTask(data: Task.Model): Observable<Task.Model> {
    const _url = `${this._serverUrl}/api/tasks`;

    return this._http.post<Task.Model>(_url, data);
  }

  public findTaskByListId(listId: string): Observable<Task.Model[]> {
    const _url = `${this._serverUrl}/api/tasks/query/${listId}`;

    return this._http.get<Task.Model[]>(_url);
  }

  public editTask(id: string, data: Task.Model) {
    const _url = `${this._serverUrl}/api/tasks/${id}`;

    return this._http.put(_url, data);
  }

  public deleteTask(id: string) {
    const _url = `${this._serverUrl}/api/tasks/${id}`;

    return this._http.delete(_url);
  }
}
