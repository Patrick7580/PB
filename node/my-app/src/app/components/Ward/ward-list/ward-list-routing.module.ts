import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WardDetailsComponent } from '../ward-details/ward-details.component';
import { WardListComponent } from './ward-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'ward-list', pathMatch: 'full' },
  {
    path: 'ward-list',
    // component: WardListComponent,
    children : [
      {
        path : '',
        component : WardListComponent
      },
      {
        path : 'edit-ward/:Id',
        loadChildren: () => import('../edit-ward/edit-ward.module')
        .then(m => m.EditWardModule),
      },
      {
        path: 'ward-details/:Id',
        component: WardDetailsComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WardListRoutingModule { }
