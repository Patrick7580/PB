import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WardList } from 'src/app/models/ward-list';
import { CoreService } from 'src/app/services/core.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-ward-list',
  templateUrl: './ward-list.component.html',
  styleUrls: ['./ward-list.component.css']
})

export class WardListComponent implements OnInit {
  showSearch : boolean = false;
  WardList : any = [];
  displayedColumns: string[] = [
    'Name',
    'PanchayatId',
    'BlockId',
    'DistrictId',
    'StateId',
    'action',
  ];
  // dataSource = ELEMENT_DATA;
  // dataSource = new MatTableDataSource(ELEMENT_DATA);

  dataSource = new MatTableDataSource<WardList[]>(this.WardList);
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  pageIndex: string | null | undefined;

  constructor( private coreServices : CoreService, private SpinnerService: NgxSpinnerService) {}

  ngOnInit(): void {
    this.SpinnerService.show();
    setTimeout(()=>{
      this.getWardList();
    },500);
  }

  getWardList(){
    this.coreServices.getWardList()
    .subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
      this.SpinnerService.hide();
      setTimeout(() => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
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
  
  openSearch(){
    this.showSearch = true;
  }
}
