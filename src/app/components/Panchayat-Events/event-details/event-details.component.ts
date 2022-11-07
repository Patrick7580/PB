import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'src/app/services/core.service';
import { Location } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';

export interface PeriodicElement {
  FirstName: string;
  LastName: string;
  Phone: number;
  RoleTypeName: string;
  PanchayatName: string;
  WardName: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    FirstName: 'Vishal',
    LastName: 'Khare',
    Phone: +91445457654,
    RoleTypeName: 'ENG',
    PanchayatName: 'Indore',
    WardName: '04',
  },
  {
    FirstName: 'Prateek',
    LastName: 'Pushpad',
    Phone: +914454444864,
    RoleTypeName: 'SE',
    PanchayatName: 'Bhopal',
    WardName: '07',
  },
];

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})

export class EventDetailsComponent implements OnInit {
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  subCategoryForm!: FormGroup;
  showSearch : boolean = false;
  EventId : any;
  Title : any;
  Description : any;
  startdDate : any;
  endDate : any;
  Panchayat : any;
  publish : any;
  BannerImageName : any;
  displayedColumns: string[] = [
    'FirstName',
    'LastName',
    'Phone',
    'RoleTypeName',
    'PanchayatName',
    'WardName',
    'action',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  pageIndex: string | null | undefined;

  constructor(private coreServices: CoreService, private route: ActivatedRoute, private location: Location,private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.SpinnerService.show();
    setTimeout(()=>{
      this.SpinnerService.hide();
      this.route.params.subscribe(params => {
        this.EventId = params['Id'];
       console.log( "ID : " + this.EventId);
       this.getEventId(this.EventId);
     });
    },200)
  }

  getEventId(value: any) {
    this.coreServices.getEventById(value).subscribe((res: any) => {
     this.Title = res.Title;
     this.Description = res.Description;
     this.startdDate = res.StartDate;
     this.endDate = res.EndDate;
     this.publish = res.Publish;
     this.Panchayat = res.TblPanchayat.Name;
     this.BannerImageName = res.BannerImageName;
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
