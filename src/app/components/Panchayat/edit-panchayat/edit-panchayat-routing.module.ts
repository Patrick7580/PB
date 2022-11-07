import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPanchayatComponent } from './edit-panchayat.component';

const routes: Routes = [
  {
    path: '',
    component: EditPanchayatComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EditPanchayatRoutingModule {}
