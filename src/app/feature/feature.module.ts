import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './components';
import { MainLayoutComponent } from './layouts';
import { MainListComponent, SingleListPageComponent } from './pages';
import { WidgetModule } from '../widget/widget.module';
import { FormsModule } from '@angular/forms';

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
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WidgetModule,
    FormsModule,
  ],
})
export class FeatureModule {}
