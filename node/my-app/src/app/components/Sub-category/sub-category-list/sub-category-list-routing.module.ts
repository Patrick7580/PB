import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCategoryComponent } from '../../Category/edit-category/edit-category.component';
import { EditSubCategoryComponent } from '../edit-sub-category/edit-sub-category.component';
import { SubCategoryDetailsComponent } from '../sub-category-details/sub-category-details.component';
import { SubCategoryListComponent } from './sub-category-list.component';

const routes: Routes = [
  
  { path: '', redirectTo: 'sub-category-list', pathMatch: 'full' },
  {
    path: 'sub-category-list',
    // component: SubCategoryListComponent,
    children : [
      {
        path : '',
        component : SubCategoryListComponent,
      },
      {
        path : 'edit-sub-category/:Id',
        component : EditSubCategoryComponent,
      },
      {
        path: 'sub-category-details/:Id',
        component: SubCategoryDetailsComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubCategoryListRoutingModule { }
