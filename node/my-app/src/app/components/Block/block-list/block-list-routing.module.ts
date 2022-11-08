import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockListComponent } from './block-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'block-list', pathMatch: 'full' },
  {
    path: 'block-list',
    // component: BlockListComponent,
    children : [
      {
        path: '',
        component: BlockListComponent,
      },
      {
        path : 'edit-block/:Id',
        loadChildren: () => import('../edit-block/edit-block.module')
        .then(m => m.EditBlockModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlockListRoutingModule { }
