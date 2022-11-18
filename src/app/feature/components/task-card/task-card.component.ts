import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TaskActions } from 'src/app/core/actions';
import { ListState } from 'src/app/core/states';
import { SubSink } from 'subsink';
import { List, Task } from '../../../core/models';
import { AddTaskComponent } from '../add-task/add-task.component';
@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit, OnDestroy {
  @Select(ListState.mainList) mainList$!: Observable<List.Model>;
  @Input() data!: Task.Model;
  private _subscriptions = new SubSink();
  mainListId: string | undefined;
  constructor(private _store: Store, private _dialog: MatDialog) {}

  ngOnInit(): void {
    this.mainListId =this._store.selectSnapshot(ListState.mainList)?._id
  }

  taskDone() {
    this._store.dispatch(
      new TaskActions.EditTask(this.data._id, { done: true })
    );
  }

  deleteTask() {
    this._store.dispatch(new TaskActions.DeleteTask(this.data._id));
  }

  moveTask() {
    const body = {
      list: this.mainListId,
    };
    this._store.dispatch(new TaskActions.EditTask(this.data._id, body));
  }

  openEditDialog() {
    const dialogRef = this._dialog.open(AddTaskComponent, {
      width: '30vw',
      data: { ...this.data, editMode: true },
    });
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
