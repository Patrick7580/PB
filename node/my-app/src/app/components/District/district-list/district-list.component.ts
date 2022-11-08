import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DistrictList } from 'src/app/models/district-list';
import { CoreService } from 'src/app/services/core.service';
import { NgxSpinnerService } from "ngx-spinner";

export interface PeriodicElement {
  Name: string;
  StateId: number;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     name: 'Baliya',
//     state: 'Uttar Pradesh',
//   },
//   {
//     name: 'Dewas',
//     state: 'Madhya Pradesh',
//   },
//   {
//     name: 'Damoh',
//     state: 'Madhya Pradesh',
//   },
//   {
//     name: 'Harda',
//     state: 'Madhya Pradesh',
//   },
//   {
//     name: 'Gwalior',
//     state: 'Madhya Pradesh',
//   },
// ];

@Component({
  selector: 'app-district-list',
  templateUrl: './district-list.component.html',
  styleUrls: ['./district-list.component.css']
})
export class DistrictListComponent implements OnInit {
  showSearch : boolean = false;
  DistrictList: any = [];
  pageIndex: string | null | undefined;
  displayedColumns: string[] = [
    'Name',
    'StateId',
    'action',
  ];

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource = new MatTableDataSource<DistrictList[]>(this.DistrictList);

  constructor( private coreServices : CoreService,private SpinnerService: NgxSpinnerService) {}

  ngOnInit(): void {
    this.SpinnerService.show();
    setTimeout(()=>{
      this.getAllDistrict();
    },500);
  }

  fireFilterEvent(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.applyFilter(input);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllDistrict() {
    this.coreServices
      .getDistrictList()
      .subscribe((response: any) => {
        this.SpinnerService.hide();
        this.dataSource = new MatTableDataSource(response);
         console.log(this.dataSource);
        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        })
      });
  }

  onPaginateChange(event: any) {
    this.pageIndex = event.pageIndex;
    localStorage.setItem('', JSON.stringify(this.pageIndex));
  }
  
  openSearch(){
    this.showSearch = true;
  }
}
