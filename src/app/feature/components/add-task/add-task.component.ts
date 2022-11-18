import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { TaskActions } from 'src/app/core/actions';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && form?.value.empty);
  }
}
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
  matcher = new MyErrorStateMatcher();

  constructor(
    private _fb: FormBuilder,
    private _store: Store,
    @Optional() public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.form.patchValue(this.data);
  }

  handleTask() {
    if (this.data.editMode) {
      this._store.dispatch(
        new TaskActions.EditTask(this.data._id, this.form.value)
      );
      this.dialogRef.close();
    } else {
      const body = { ...this.form.value, list: this.listId };
      this._store.dispatch(new TaskActions.AddTask(body));
      this.form.reset();
    }
  }
}
