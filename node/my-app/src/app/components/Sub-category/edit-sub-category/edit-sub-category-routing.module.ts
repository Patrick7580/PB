import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditSubCategoryComponent } from './edit-sub-category.component';

const routes: Routes = [
  {
    path: '',
    component: EditSubCategoryComponent ,pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditSubCategoryRoutingModule { }
