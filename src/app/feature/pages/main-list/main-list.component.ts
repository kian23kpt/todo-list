import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TaskActions } from 'src/app/core/actions';
import { List, Task } from 'src/app/core/models';
import { ListState, TaskState } from 'src/app/core/states';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-main-list',
  templateUrl: './main-list.component.html',
  styleUrls: ['../../public/list-page.scss', './main-list.component.scss'],
})
export class MainListComponent implements OnInit, OnDestroy {
  @Select(ListState.mainList) mainList$!: Observable<List.Model>;
  @Select(TaskState.tasks) tasks$?: Observable<Task.Model[]>;
  listId!: string;
  private _subscriptions = new SubSink();

  constructor(private _store: Store) {}

  ngOnInit(): void {
    this._subscriptions.add(
      this.mainList$.subscribe((list) => {
        if (list?._id) {
          this._store.dispatch(new TaskActions.FindTaskByListId(list?._id));
          this.listId = list?._id;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
