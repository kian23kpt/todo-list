import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ListActions } from 'src/app/core/actions';
import { List } from 'src/app/core/models';
import { ListState } from 'src/app/core/states';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Select(ListState.lists) Lists$!: Observable<List.Model[]>;
  sidebarLists$ = new Observable<List.Model[]>();
  showAddListInput = false;
  listTiltle!: string;

  constructor(private _store: Store) {}

  ngOnInit(): void {
    this._store.dispatch(new ListActions.AllLists());
  }

  addList() {
    this._store.dispatch(new ListActions.AddList(this.listTiltle));
    this.listTiltle = '';
  }
}
