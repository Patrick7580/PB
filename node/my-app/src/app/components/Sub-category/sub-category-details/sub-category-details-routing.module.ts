import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubCategoryDetailsComponent } from './sub-category-details.component';

const routes: Routes = [
  {
    path: '',
    component: SubCategoryDetailsComponent ,pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubCategoryDetailsRoutingModule { }
