import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './components';
import { MainLayoutComponent } from './layouts';
import { MainListComponent } from './pages';
import { WidgetModule } from '../widget/widget.module';

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
        path: '**',
        redirectTo: 'main-list',
      },
    ],
  },
];

@NgModule({
  declarations: [MainLayoutComponent, MainListComponent, SidebarComponent],
  imports: [CommonModule, RouterModule.forChild(routes), WidgetModule],
})
export class FeatureModule {}
