import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ListActions, TaskActions } from 'src/app/core/actions';
import { List, Task } from 'src/app/core/models';
import { ListState, TaskState } from 'src/app/core/states';
import { SubSink } from 'subsink';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-single-list-page',
  templateUrl: './single-list-page.component.html',
  styleUrls: [
    '../../public/list-page.scss',
    './single-list-page.component.scss',
  ],
})
export class SingleListPageComponent implements OnInit, OnDestroy {
  @Select(ListState.selectedList) selectedlist$?: Observable<List.Model>;
  @Select(TaskState.tasks) tasks$?: Observable<Task.Model[]>;

  listId!: string;
  listTiltle!: string;
  editableTitle = false;
  private _subscriptions = new SubSink();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _store: Store,
    private _router: Router,
    private _toastr: ToastrService
  ) {
    this._subscriptions.add(
      this._activatedRoute.params.subscribe((res) => {
        this.listId = res['id'];
        this._store.dispatch(new ListActions.GetSingleList(this.listId));
        this._store.dispatch(new TaskActions.FindTaskByListId(this.listId));
      })
    );
  }

  ngOnInit(): void {
    this._subscriptions.add(
      this.selectedlist$?.subscribe((list: List.Model) => {
        this.listTiltle = list?.title;
        this.editableTitle = false;
      })
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  deleteList() {
    this._subscriptions.add(
      this._store.dispatch(new ListActions.DeleteList(this.listId)).subscribe({
        next: () => {
          this._toastr.info(`The list was deleted`);
          this._router.navigateByUrl('/mainList');
        },
      })
    );
  }

  editListTitle() {
    this._store.dispatch(
      new ListActions.EditList(this.listId, this.listTiltle)
    );
    this.editableTitle = false;
  }
}
