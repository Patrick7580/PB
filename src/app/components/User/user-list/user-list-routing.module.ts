import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditEventComponent } from '../../Panchayat-Events/edit-event/edit-event.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { UserListComponent } from './user-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'user-list', pathMatch: 'full' },
  
  {
    path: 'user-list',
    // component: UserListComponent,
    children : [
      {
        path : '',
        component : UserListComponent,
      },
      {
        path : 'edit-user/:Id',
        component : EditUserComponent
      },
      {
        path : 'user-details/:Id',
        component : UserDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserListRoutingModule { }
