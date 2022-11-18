import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs';
import { TaskActions } from '../actions';
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
  constructor(private _restService: TaskService, private _store: Store) {}

  @Selector()
  static completedTasks(state: Task.State): Task.Model[] {
    return state.completedTask;
  }

  @Selector()
  static tasks(state: Task.State): Task.Model[] {
    return state.tasks;
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
    { patchState, getState }: StateContext<Task.State>,
    { data }: TaskActions.AddTask
  ) {
    return this._restService.addTask(data).pipe(
      tap((response: Task.Model) => {
        const updatedTasks = [...getState().tasks, response];
        patchState({
          tasks: updatedTasks,
        });
      })
    );
  }

  @Action(TaskActions.EditTask, { cancelUncompleted: true })
  editTask(
    { patchState, getState }: StateContext<Task.State>,
    { id, data }: TaskActions.EditTask
  ) {
    return this._restService.editTask(id, data).pipe(
      tap(() => {
        const index = getState().tasks.findIndex((task) => task._id === id);
        getState().tasks[index] = { ...getState().tasks[index], ...data };
      })
    );
  }

  @Action(TaskActions.DeleteTask, { cancelUncompleted: true })
  deleteTask(
    { dispatch, getState }: StateContext<Task.State>,
    { id }: TaskActions.DeleteTask
  ) {
    return this._restService.deleteTask(id).pipe(
      tap(() => {
        const index = getState().tasks.findIndex((task) => task._id === id);
        const completedIndex = getState().completedTask.findIndex(
          (task) => task._id === id
        );
        if (index > -1) {
          getState().tasks.splice(index, 1);
        }
        if (completedIndex > -1) {
          getState().completedTask.splice(completedIndex, 1);
        }
      })
    );
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
