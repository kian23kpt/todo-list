import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { TaskActions } from 'src/app/core/actions';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  @Input() listId!: string;
  form = this._fb.group({
    title: ['', Validators.required],
    description: [''],
  });

  constructor(private _fb: FormBuilder, private _store: Store) {}

  ngOnInit(): void {}

  addTask() {
    const data = { ...this.form.value, list: this.listId };
    this._store.dispatch(new TaskActions.AddTask(data));
  }
}
