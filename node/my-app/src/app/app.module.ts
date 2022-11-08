import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './components/User/user-list/user-list.component';
import { CategoryListComponent } from './components/Category/category-list/category-list.component';
import { SubCategoryListComponent } from './components/Sub-category/sub-category-list/sub-category-list.component';
import { DistrictListComponent } from './components/District/district-list/district-list.component';
import { BlockListComponent } from './components/Block/block-list/block-list.component';
import { PanchayatListComponent } from './components/Panchayat/panchayat-list/panchayat-list.component';
import { WardListComponent } from './components/Ward/ward-list/ward-list.component';
import { EventListComponent } from './components/Panchayat-Events/event-list/event-list.component';
import { ComplaintListComponent } from './components/Complaint/complaint-list/complaint-list.component';
import { AddUserComponent } from './components/User/add-user/add-user.component';
import { AddCategoryComponent } from './components/Category/add-category/add-category.component';
import { AddSubCategoryComponent } from './components/Sub-category/add-sub-category/add-sub-category.component';
import { AddDistrictComponent } from './components/District/add-district/add-district.component';
import { AddBlockComponent } from './components/Block/add-block/add-block.component';
import { AddWardComponent } from './components/Ward/add-ward/add-ward.component';
import { AddEventComponent } from './components/Panchayat-Events/add-event/add-event.component';
import { AddPanchayatComponent } from './components/Panchayat/add-panchayat/add-panchayat.component';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { EditCategoryComponent } from './components/Category/edit-category/edit-category.component';
import { EditSubCategoryComponent } from './components/Sub-category/edit-sub-category/edit-sub-category.component';
import { EditDistrictComponent } from './components/District/edit-district/edit-district.component';
import { EditBlockComponent } from './components/Block/edit-block/edit-block.component';
import { UserDetailsComponent } from './components/User/user-details/user-details.component';
import { SubCategoryDetailsComponent } from './components/Sub-category/sub-category-details/sub-category-details.component';
import { PanchayatDetailsComponent } from './components/Panchayat/panchayat-details/panchayat-details.component';
import { WardDetailsComponent } from './components/Ward/ward-details/ward-details.component';
import { EventDetailsComponent } from './components/Panchayat-Events/event-details/event-details.component';
import { RegionWiseReportComponent } from './components/Reporting/region-wise-report/region-wise-report.component';
import { ComplaintDetailsComponent } from './components/Complaint/complaint-details/complaint-details.component';
import { StatusWiseReportComponent } from './components/Reporting/status-wise-report/status-wise-report.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MaterialModule } from 'src/app/material/material.module';
import { LogoutComponent } from './logout/logout.component';
import { NgChartsModule } from 'ng2-charts';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';
import { EditPanchayatComponent } from './components/Panchayat/edit-panchayat/edit-panchayat.component';
import { EditWardComponent } from './components/Ward/edit-ward/edit-ward.component';
import { EditComplaintComponent } from './components/Complaint/edit-complaint/edit-complaint.component';
import { EditEventComponent } from './components/Panchayat-Events/edit-event/edit-event.component';
import { EditUserComponent } from './components/User/edit-user/edit-user.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    UserListComponent,
    CategoryListComponent,
    SubCategoryListComponent,
    DistrictListComponent,
    BlockListComponent,
    PanchayatListComponent,
    WardListComponent,
    EventListComponent,
    ComplaintListComponent,
    AddUserComponent,
    AddCategoryComponent,
    AddSubCategoryComponent,
    AddDistrictComponent,
    AddBlockComponent,
    AddWardComponent,
    AddEventComponent,
    AddPanchayatComponent,
    NotificationListComponent,
    EditCategoryComponent,
    EditSubCategoryComponent,
    EditDistrictComponent,
    EditBlockComponent,
    UserDetailsComponent,
    SubCategoryDetailsComponent,
    PanchayatDetailsComponent,
    WardDetailsComponent,
    EventDetailsComponent,
    RegionWiseReportComponent,
    ComplaintDetailsComponent,
    StatusWiseReportComponent,
    DashboardLayoutComponent,
    LogoutComponent,
    EditPanchayatComponent,
    EditWardComponent,
    EditComplaintComponent,
    EditEventComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgChartsModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi : true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
