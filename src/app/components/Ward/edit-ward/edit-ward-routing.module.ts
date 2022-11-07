import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditWardComponent } from './edit-ward.component';

const routes: Routes = [
  {
    path: '',
    component: EditWardComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditWardRoutingModule { }
