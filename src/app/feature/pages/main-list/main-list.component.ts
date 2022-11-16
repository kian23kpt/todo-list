import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { TaskActions } from 'src/app/core/actions';

@Component({
  selector: 'app-main-list',
  templateUrl: './main-list.component.html',
  styleUrls: ['./main-list.component.scss'],
})
export class MainListComponent implements OnInit {
  constructor(private _store: Store) {}

  ngOnInit(): void {
    // this._store.dispatch(new TaskActions.AddTask({}));
    this._store.dispatch(new TaskActions.AllTasks());
  }
}
