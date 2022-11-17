import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TaskActions } from 'src/app/core/actions';
import { TaskState } from 'src/app/core/states';
import { Task } from '../../../core/models';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.scss'],
})
export class CompletedTasksComponent implements OnInit {
  @Select(TaskState.completedTasks) completedTasks$!: Observable<Task.Model[]>;
  constructor(private _store: Store) {}

  ngOnInit(): void {
    this._store.dispatch(new TaskActions.CompletedTasks());
  }
}
