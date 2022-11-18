import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ListActions } from 'src/app/core/actions';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  constructor(private _store: Store) {}

  ngOnInit(): void {
    this._store.dispatch(new ListActions.AllLists());
    this._store.dispatch(new ListActions.MainList());
  }
}
