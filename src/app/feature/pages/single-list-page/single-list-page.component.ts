import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { ListActions } from 'src/app/core/actions';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-single-list-page',
  templateUrl: './single-list-page.component.html',
  styleUrls: ['./single-list-page.component.scss'],
})
export class SingleListPageComponent implements OnInit, OnDestroy {
  listId!: string;
  private _subscriptions = new SubSink();

  constructor(private _activatedRoute: ActivatedRoute, private _store: Store) {
    this._subscriptions.add(
      this._activatedRoute.params.subscribe((res) => {
        this.listId = res['id'];
      })
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  deleteList() {
    this._store.dispatch(new ListActions.DeleteList(this.listId));
  }
}
