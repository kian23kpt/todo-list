import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { filter, map, Observable } from 'rxjs';
import { ListActions } from 'src/app/core/actions';
import { List } from 'src/app/core/models';
import { ListState } from 'src/app/core/states';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Select(ListState.lists) lists$!: Observable<List.Model[]>;
  sidebarLists$ = new Observable<List.Model[]>();
  showAddListInput = false;
  listTiltle!: string;
  private _relativePath:string[] =[];
  otherLists$= new Observable<List.Model[]>;

  constructor(private _store: Store, private _router: Router) {}

  get relativePath(): string[] {
    return this._relativePath;
  }

  ngOnInit(): void {
    this._relativePath = this._router.url.split('/');

    this._router.events.pipe(filter(evt => evt instanceof NavigationEnd)).subscribe(event => {
      this._relativePath = this._router.url.split('/');
    });
    
    this.otherLists$ = this.lists$.pipe(
      map((lists) => lists.filter((list) => !list.isMain))
    );
  }

  addList() {
    this._store.dispatch(new ListActions.AddList(this.listTiltle));
    this.listTiltle = '';
    this.showAddListInput = false;
  }
}
