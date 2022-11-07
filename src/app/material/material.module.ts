import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { NgApexchartsModule } from "ng-apexcharts";
import { NgxSpinnerModule } from "ngx-spinner";  
@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatFormFieldModule,
    MaterialFileInputModule,
    MatToolbarModule,
    MatTooltipModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatChipsModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    NgxChartsModule,
    MatDatepickerModule,
    MatBadgeModule,
    MatCheckboxModule,
    NgApexchartsModule,
    NgxSpinnerModule
  ]
})
export class MaterialModule { }
