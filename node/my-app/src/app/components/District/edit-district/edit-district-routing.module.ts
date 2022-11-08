import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditDistrictComponent } from './edit-district.component';

const routes: Routes = [
  {
    path: '',
    component: EditDistrictComponent,pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditDistrictRoutingModule { }
