import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComplaintDetailsComponent } from '../complaint-details/complaint-details.component';
import { EditComplaintComponent } from '../edit-complaint/edit-complaint.component';
import { ComplaintListComponent } from './complaint-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'complaint-list', pathMatch: 'full' },
  {
    path: 'complaint-list',
    // component: ComplaintListComponent,
    children : [
      {
        path : '',
        component : ComplaintListComponent,
      },
      {
        path : 'edit-complaint/:Id',
        component : EditComplaintComponent
      },
      {
        path: 'complaint-details/:Id',
        component: ComplaintDetailsComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplaintListRoutingModule { }
