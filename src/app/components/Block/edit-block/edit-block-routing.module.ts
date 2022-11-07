import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockListComponent } from '../block-list/block-list.component';
import { EditBlockComponent } from './edit-block.component';

const routes: Routes = [
  {
    path: '',
    component: EditBlockComponent,
    pathMatch: 'full'
  },
  {
    path : 'block-list',
    component : BlockListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditBlockRoutingModule { }
