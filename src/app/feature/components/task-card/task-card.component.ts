import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../../core/models';
@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
  @Input() data!: Task.Model;

  constructor() {}

  ngOnInit(): void {}
}
