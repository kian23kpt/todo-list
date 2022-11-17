import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {
  AddTaskComponent,
  SidebarComponent,
  TaskCardComponent,
} from './components';
import { MainLayoutComponent } from './layouts';
import {
  CompletedTasksComponent,
  MainListComponent,
  SingleListPageComponent,
} from './pages';
import { WidgetModule } from '../widget/widget.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'main-list',
      },
      {
        path: 'main-list',
        component: MainListComponent,
      },
      {
        path: 'list',
        children: [
          {
            path: ':id',
            component: SingleListPageComponent,
          },
        ],
      },
      {
        path: 'completed-tasks',
        component: CompletedTasksComponent,
      },
      {
        path: '**',
        redirectTo: 'main-list',
      },
    ],
  },
];

@NgModule({
  declarations: [
    MainLayoutComponent,
    MainListComponent,
    SidebarComponent,
    SingleListPageComponent,
    TaskCardComponent,
    CompletedTasksComponent,
    AddTaskComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WidgetModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class FeatureModule {}
