import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditDistrictComponent } from '../edit-district/edit-district.component';
import { DistrictListComponent } from './district-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'district-list', pathMatch: 'full' },
  {
    path: 'district-list',
    // component: DistrictListComponent,
    children : [
      {
        path : '',
        component : DistrictListComponent
      },
      {
        path : 'edit-district/:Id',
        component : EditDistrictComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistrictListRoutingModule { }
