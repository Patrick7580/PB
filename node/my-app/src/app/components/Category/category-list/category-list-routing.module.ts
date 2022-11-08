import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { CategoryListComponent } from './category-list.component';

const routes: Routes = [
    { path: '', redirectTo: 'category-list', pathMatch: 'full' },
    {
        path: 'category-list',
        children: [
            {
                path: '',
                component: CategoryListComponent,
            },
            {
                path: 'edit-category/:Id',
                component: EditCategoryComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoryListRoutingModule { }
