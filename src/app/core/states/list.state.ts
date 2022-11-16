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
    selectedList: null,
  },
})
@Injectable()
export class ListState {
  constructor(private _restService: ListService) {}

  @Selector()
  static lists(state: List.State): List.Model[] {
    return state.lists;
  }

  @Selector()
  static selectedList(state: List.State): List.Model | null {
    return state.selectedList;
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

  @Action(ListActions.GetSingleList, { cancelUncompleted: true })
  getSingleList(
    { dispatch, patchState }: StateContext<List.State>,
    { id }: ListActions.GetSingleList
  ) {
    return this._restService.getSingleList(id).pipe(
      tap((response: List.Model) => {
        patchState({
          selectedList: response,
        });
      })
    );
  }

  @Action(ListActions.EditList, { cancelUncompleted: true })
  editList(
    { dispatch, patchState }: StateContext<List.State>,
    { id, title }: ListActions.EditList
  ) {
    return this._restService.editList(id, title).pipe(
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
