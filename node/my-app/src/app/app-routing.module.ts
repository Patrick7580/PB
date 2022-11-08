import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './components/User/add-user/add-user.component';
import { AddCategoryComponent } from './components/Category/add-category/add-category.component';
import { AddSubCategoryComponent } from './components/Sub-category/add-sub-category/add-sub-category.component';
import { AddDistrictComponent } from './components/District/add-district/add-district.component';
import { AddBlockComponent } from './components/Block/add-block/add-block.component';
import { AddWardComponent } from './components/Ward/add-ward/add-ward.component';
import { AddEventComponent } from './components/Panchayat-Events/add-event/add-event.component';
import { AddPanchayatComponent } from './components/Panchayat/add-panchayat/add-panchayat.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { UserDetailsComponent } from './components/User/user-details/user-details.component';
import { SubCategoryDetailsComponent } from './components/Sub-category/sub-category-details/sub-category-details.component';
import { PanchayatDetailsComponent } from './components/Panchayat/panchayat-details/panchayat-details.component';
import { WardDetailsComponent } from './components/Ward/ward-details/ward-details.component';
import { EventDetailsComponent } from './components/Panchayat-Events/event-details/event-details.component';
import { RegionWiseReportComponent } from './components/Reporting/region-wise-report/region-wise-report.component';
import { ComplaintDetailsComponent } from './components/Complaint/complaint-details/complaint-details.component';
import { StatusWiseReportComponent } from './components/Reporting/status-wise-report/status-wise-report.component';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    data: { title: 'First Component' },
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: AppComponent,
    data: { title: 'main Component' },
    children: [{ path: '', component: LoginComponent }],
  },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'Dashboard',
    component: DashboardLayoutComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'region-report', pathMatch: 'full' },
      { path: 'region-report', component: RegionWiseReportComponent },
      { path: 'status-wise-report', component: StatusWiseReportComponent },
      { path: 'notification-list', component: NotificationListComponent },

      // --------------------------------------- USERS -----

      {
        path: 'user-list',
        loadChildren: () => import('../app/components/User/user-list/user-list.module')
          .then(m => m.UserListModule)
      },
      { path: 'add-user', component: AddUserComponent },

      // ------ -----------------------------------------Category ---------

      {
        path: 'category-list',
        loadChildren: () => import('../app/components/Category/category-list/category-list.module')
          .then(m => m.CategoryListModule)
      },

      { path: 'add-category', component: AddCategoryComponent },

      // -------------------------------------------Sub-Category------------

      {
        path: 'sub-category-list',
        loadChildren: () => import('../app/components/Sub-category/sub-category-list/sub-category-list.module')
          .then(m => m.SubCategoryListModule)
      },

      { path: 'add-subCategory', component: AddSubCategoryComponent },

      // -------------------------------------------District---------------
      {
        path: 'district-list',
        loadChildren: () => import('../app/components/District/district-list/district-list.module')
          .then(m => m.DistrictListModule)
      },
      { path: 'add-district', component: AddDistrictComponent },

      // --------Block-------------
      {
        path: 'block-list',
        loadChildren: () => import('../app/components/Block/block-list/block-list.module')
          .then(m => m.BlockListModule)
      },
      { path: 'add-block', component: AddBlockComponent },

      // -------Panchayat------------
      {
        path: 'panchayat-list',
        loadChildren: () => import('../app/components/Panchayat/panchayat-list/panchayat-list.module')
          .then(m => m.PanchayatListModule)
      },
      { path: 'add-panchayat', component: AddPanchayatComponent },

      // -------Ward------------
      {
        path: 'ward-list',
        loadChildren: () => import('../app/components/Ward/ward-list/ward-list.module')
          .then(m => m.WardListModule)
      },
      { path: 'add-ward', component: AddWardComponent },

      // -------Complaint-------------
      {
        path: 'complaint-list',
        loadChildren: () => import('../app/components/Complaint/complaint-list/complaint-list.module')
          .then(m => m.ComplaintListModule)
      },

      // --------Event--------------
      {
        path: 'event-list',
        loadChildren: () => import('../app/components/Panchayat-Events/event-list/event-list.module')
          .then(m => m.EventListModule)
      },
      { path: 'add-event', component: AddEventComponent },
    ],
  },
  
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
