import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { NgxSpinnerService } from "ngx-spinner";

export interface PeriodicElement {
  category: string;
  subCategory: string;
  complainUser: string;
  createDate: string;
  assignTo: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    category: 'Yoga Day',
    subCategory: 'YOGA',
    complainUser: '',
    createDate: '07/07/2022',
    assignTo: '07/07/2022',
    status: 'Salkanpur',
  },
  {
    category: 'Jal Mahotsav Day',
    subCategory: 'YOGA',
    complainUser: '',
    createDate: '07/07/2022',
    assignTo: '07/07/2022',
    status: 'Salkanpur',
  },
];

@Component({
  selector: 'app-sub-category-details',
  templateUrl: './sub-category-details.component.html',
  styleUrls: ['./sub-category-details.component.css']
})

export class SubCategoryDetailsComponent implements OnInit {
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  subCategoryForm!: FormGroup;
  showSearch : boolean = false;
  SubCategoryId: any;

  displayedColumns: string[] = [
    'category',
    'subCategory',
    'complainUser',
    'createDate',
    'assignTo',
    'status',
    'action',
  ];

  En_Name : any;
  Category : any;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  pageIndex: string | null | undefined;

  constructor( private coreServices: CoreService, private route: ActivatedRoute, private SpinnerService: NgxSpinnerService) {}

  ngOnInit(): void {
    this.SpinnerService.show();
    setTimeout(()=>{
      this.SpinnerService.hide();
    this.route.params.subscribe(params => {
      this.SubCategoryId = params['Id'];
      console.log("ID : " + this.SubCategoryId);
      this.getSubCategoryId(this.SubCategoryId);
    });
  },200)
  }

  getSubCategoryId(value: any) {
    this.coreServices.getSubCategoryById(value).subscribe((res: any) => {
      this.En_Name = res.En_Name;
      this.Category = res.TblCategory.En_Name;  
    });
  }

  fireFilterEvent(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.applyFilter(input);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onPaginateChange(event: any) {
    this.pageIndex = event.pageIndex;
    localStorage.setItem('', JSON.stringify(this.pageIndex));
  }

  saveDetails() {}

  reloadPage() {
    window.location.reload();
  }

  openSearch(){
    this.showSearch = true;
  }
}
