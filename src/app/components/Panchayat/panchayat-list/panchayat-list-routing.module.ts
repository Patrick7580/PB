import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPanchayatComponent } from '../edit-panchayat/edit-panchayat.component';
import { PanchayatDetailsComponent } from '../panchayat-details/panchayat-details.component';
import { PanchayatListComponent } from './panchayat-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'panchayat-list', pathMatch: 'full' },
  {
    path: 'panchayat-list',
    // component: PanchayatListComponent,
    children : [
      {
        path: '',
        component : PanchayatListComponent,
      },
      {
        path : 'edit-panchayat/:Id',
        component : EditPanchayatComponent
      },
      {
        path: 'panchayat-details/:Id',
        component: PanchayatDetailsComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanchayatListRoutingModule { }
