import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ObjectID } from 'bson';
import { Observable } from 'rxjs';
import { List } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(
    private _http: HttpClient,
    @Inject('SERVER_URL') private _serverUrl: string
  ) {}

  public getMainList(): Observable<List.Model> {
    const _url = `${this._serverUrl}/api/mainList`;

    return this._http.get<List.Model>(_url);
  }

  public getAllLists(): Observable<List.Model[]> {
    const _url = `${this._serverUrl}/api/lists`;

    return this._http.get<List.Model[]>(_url);
  }

  public addList(title: string): Observable<List.Model[]> {
    const _url = `${this._serverUrl}/api/lists/`;
    const id = new ObjectID();
    const date = new Date();
    const body = { title: title, id: id, date: date, isMain: false };

    return this._http.post<List.Model[]>(_url, body);
  }

  public editList(id: string, data: List.Model): Observable<List.Model[]> {
    const _url = `${this._serverUrl}/api/lists/${id}`;

    return this._http.post<List.Model[]>(_url, data);
  }

  public deleteList(id: string): Observable<List.Model[]> {
    const _url = `${this._serverUrl}/api/lists/${id}`;

    return this._http.delete<List.Model[]>(_url);
  }
}
