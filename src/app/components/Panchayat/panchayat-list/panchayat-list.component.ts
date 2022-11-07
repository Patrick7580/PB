import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PanchayatList } from 'src/app/models/panchayat-list';
import { CoreService } from 'src/app/services/core.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-panchayat-list',
  templateUrl: './panchayat-list.component.html',
  styleUrls: ['./panchayat-list.component.css']
})

export class PanchayatListComponent implements OnInit {
  PanchayatList: any = [];
  showSearch: boolean = false;
  displayedColumns: string[] = [
    'Name',
    'BlockId',
    'DistrictId',
    'StateId',
    'action'
  ];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource = new MatTableDataSource<PanchayatList[]>(this.PanchayatList);

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  pageIndex: string | null | undefined;

  constructor(private coreServices: CoreService, private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.SpinnerService.show();
    setTimeout(() => {
      this.getPanchayat();
    }, 500)
  }

  getPanchayat() {
    this.coreServices.getPanchayatList().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
      this.SpinnerService.hide();
      setTimeout(() => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
    })
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

  openSearch() {
    this.showSearch = true;
  }

}
