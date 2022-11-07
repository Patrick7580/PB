import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { NgxSpinnerService } from "ngx-spinner";

export interface ComplainElement {
  category: string;
  subCategory: string;
  complainUser: string;
  createDate: string;
  assignTo: string;
  status: string;
}

const COMPLAIN_DATA: ComplainElement[] = [
  {
    category: 'Yoga Day',
    subCategory: 'YOGA',
    complainUser: '',
    createDate: '07/07/2022',
    assignTo: '07/07/2022',
    status: 'Salkanpur',
  },
  {
    category: 'Yoga Day',
    subCategory: 'YOGA',
    complainUser: '',
    createDate: '07/07/2022',
    assignTo: '07/07/2022',
    status: 'Salkanpur',
  },
  {
    category: 'Yoga Day',
    subCategory: 'YOGA',
    complainUser: '',
    createDate: '07/07/2022',
    assignTo: '07/07/2022',
    status: 'Salkanpur',
  },
  {
    category: 'Yoga Day',
    subCategory: 'YOGA',
    complainUser: '',
    createDate: '07/07/2022',
    assignTo: '07/07/2022',
    status: 'Salkanpur',
  },
  {
    category: 'Yoga Day',
    subCategory: 'YOGA',
    complainUser: '',
    createDate: '07/07/2022',
    assignTo: '07/07/2022',
    status: 'Salkanpur',
  },
  {
    category: 'Yoga Day',
    subCategory: 'YOGA',
    complainUser: '',
    createDate: '07/07/2022',
    assignTo: '07/07/2022',
    status: 'Salkanpur',
  },
];

export interface EventElement {
  title: string;
  description: string;
  bannerimage: string;
  startdate: string;
  enddate: string;
  panchayat: string;
  publish: string;
}

const EVENT_DATA: EventElement[] = [
  // Yoga day	YOGA		07/07/2022	07/07/2022	Salkanpur	No
  {
    title: 'Yoga Day',
    description: 'YOGA',
    bannerimage: '',
    startdate: '07/07/2022',
    enddate: '07/07/2022',
    panchayat: 'Salkanpur',
    publish: 'No',
  },
  {
    title: 'Yoga Day',
    description: 'YOGA',
    bannerimage: '',
    startdate: '07/07/2022',
    enddate: '07/07/2022',
    panchayat: 'Salkanpur',
    publish: 'No',
  },
  {
    title: 'Yoga Day',
    description: 'YOGA',
    bannerimage: '',
    startdate: '07/07/2022',
    enddate: '07/07/2022',
    panchayat: 'Salkanpur',
    publish: 'No',
  },
];

@Component({
  selector: 'app-panchayat-details',
  templateUrl: './panchayat-details.component.html',
  styleUrls: ['./panchayat-details.component.css']
})
export class PanchayatDetailsComponent implements OnInit {
  subCategoryForm!: FormGroup;
  showSearch: boolean = false;
  PanchayatId: any;

  District: any;
  Block: any;
  State: any;
  Name: any;
  displayedColumns1: string[] = [
    'category',
    'subCategory',
    'complainUser',
    'createDate',
    'assignTo',
    'status',
    'action',
  ];

  displayedColumns2: string[] = [
    'title',
    'description',
    'bannerimage',
    'startdate',
    'enddate',
    'panchayat',
    'publish',
    'action',
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  complainDataSource = new MatTableDataSource(COMPLAIN_DATA);
  eventDataSource = new MatTableDataSource(EVENT_DATA);
  pageIndex: any;

  constructor(private coreServices: CoreService, private route: ActivatedRoute, private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.SpinnerService.show();
    setTimeout(() => {
      this.SpinnerService.hide();
      this.route.params.subscribe(params => {
        this.PanchayatId = params['Id'];
        console.log("ID : " + this.PanchayatId);
        this.getPanchayatId(this.PanchayatId);
      });
    }, 200)
  }

  getPanchayatId(value: any) {
    this.coreServices.getPanchayatById(value).subscribe((res: any) => {
      this.District = res.TblDistrict.Name;
      this.State = res.TblState.Name;
      this.Name = res.Name;
      this.Block = res.TblBlock.Name;
    });
  }

  fireFilterEvent(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.applyFilter(input);
  }

  applyFilter(filterValue: string) {
    this.complainDataSource.filter = filterValue.trim().toLowerCase();
    this.eventDataSource.filter = filterValue.trim().toLowerCase();
  }

  reloadPage() {
    window.location.reload();
  }
  onSave() {
    console.log(this.subCategoryForm.value);
  }

  onPaginateChange(event: any) {
    this.pageIndex = event.pageIndex;
    localStorage.setItem('', JSON.stringify(this.pageIndex));
  }
  openSearch() {
    this.showSearch = true;
  }
}
