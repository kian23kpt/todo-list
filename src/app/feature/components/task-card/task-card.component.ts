import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { TaskActions } from 'src/app/core/actions';
import { Task } from '../../../core/models';
@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
  @Input() data!: Task.Model;

  constructor(private _store: Store) {}

  ngOnInit(): void {}

  taskDone() {
    this._store.dispatch(
      new TaskActions.EditTask(this.data._id, { done: true })
    );
  }
}
