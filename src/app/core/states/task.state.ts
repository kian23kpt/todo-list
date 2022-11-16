import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { ListActions, TaskActions } from '../actions';
import { Task } from '../models';
import { TaskService } from '../services/REST/task.service';

@State<Task.State>({
  name: 'task',
  defaults: {
    completedTask: [],
    tasks: [],
  },
})
@Injectable()
export class TaskState {
  constructor(private _restService: TaskService) {}

  @Selector()
  static completedTasks(state: Task.State): Task.Model[] {
    return state.completedTask;
  }

  @Selector()
  static tasks(state: Task.State): Task.Model[] {
    return state.tasks;
  }

  @Action(TaskActions.AllTasks, { cancelUncompleted: true })
  getAllTasks({ dispatch, patchState }: StateContext<Task.State>) {
    return this._restService.getAllTasks().pipe(
      tap((response: Task.Model[]) => {
        patchState({
          //   lists: response,
        });
      })
    );
  }

  @Action(TaskActions.CompletedTasks, { cancelUncompleted: true })
  completedTasks({ dispatch, patchState }: StateContext<Task.State>) {
    return this._restService.completedTasks().pipe(
      tap((response: Task.Model[]) => {
        patchState({
          completedTask: response,
        });
      })
    );
  }

  @Action(TaskActions.AddTask, { cancelUncompleted: true })
  addTask(
    { dispatch, patchState }: StateContext<Task.State>,
    { data }: TaskActions.AddTask
  ) {
    return this._restService
      .addTask(data)
      .pipe
      // tap((response: Task.Model[]) => {
      //   patchState({
      //     completedTask: response,
      //   });
      // })
      ();
  }

  @Action(TaskActions.FindTaskByListId, { cancelUncompleted: true })
  findTaskByListId(
    { dispatch, patchState }: StateContext<Task.State>,
    { listId }: TaskActions.FindTaskByListId
  ) {
    return this._restService.findTaskByListId(listId).pipe(
      tap((response: Task.Model[]) => {
        patchState({
          tasks: response,
        });
      })
    );
  }
}
