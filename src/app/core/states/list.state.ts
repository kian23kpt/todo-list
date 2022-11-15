import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { ListActions } from '../actions';
import { List } from '../models';
import { ListService } from '../services/REST';

@State<List.State>({
  name: 'list',
  defaults: {
    lists: [],
  },
})
@Injectable()
export class ListState {
  constructor(private _restService: ListService) {}

  @Selector()
  static lists(state: List.State): List.Model[] {
    return state.lists;
  }

  @Action(ListActions.MainList, { cancelUncompleted: true })
  getmainList({ dispatch, patchState }: StateContext<List.State>) {
    return this._restService.getMainList().pipe(
      tap((response: List.Model) => {
        patchState({
          //   lists: response,
        });
      })
    );
  }

  @Action(ListActions.AllLists, { cancelUncompleted: true })
  getAllLists({ dispatch, patchState }: StateContext<List.State>) {
    return this._restService.getAllLists().pipe(
      tap((response: List.Model[]) => {
        patchState({
          lists: response,
        });
      })
    );
  }

  @Action(ListActions.EditList, { cancelUncompleted: true })
  editList(
    { dispatch, patchState }: StateContext<List.State>,
    { id, data }: ListActions.EditList
  ) {
    return this._restService.editList(id, data).pipe(
      tap((response: List.Model[]) => {
        dispatch(new ListActions.AllLists());
      })
    );
  }

  @Action(ListActions.AddList, { cancelUncompleted: true })
  addList(
    { dispatch, patchState }: StateContext<List.State>,
    { title }: ListActions.AddList
  ) {
    return this._restService.addList(title).pipe(
      tap((response: List.Model[]) => {
        dispatch(new ListActions.AllLists());
      })
    );
  }

  @Action(ListActions.DeleteList, { cancelUncompleted: true })
  deleteList(
    { dispatch, patchState }: StateContext<List.State>,
    { id }: ListActions.DeleteList
  ) {
    return this._restService.deleteList(id).pipe(
      tap((response: List.Model[]) => {
        dispatch(new ListActions.AllLists());
      })
    );
  }
}
