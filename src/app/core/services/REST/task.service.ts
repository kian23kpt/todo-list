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

  public addTask(data: Task.Model) {
    const _url = `${this._serverUrl}/api/tasks`;
    const body = {
      title: 'second task',
      list: '63748a0bcfb3ab7bc85a098f',
    };
    return this._http.post(_url, body);
  }

  public findTaskByListId(listId: string): Observable<Task.Model[]> {
    const _url = `${this._serverUrl}/api/tasks/query/${listId}`;

    return this._http.get<Task.Model[]>(_url);
  }
}
