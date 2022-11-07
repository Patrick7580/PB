import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SubCategoryList } from 'src/app/models/sub-category';
import { CoreService } from 'src/app/services/core.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-sub-category-list',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.css']
})
export class SubCategoryListComponent implements OnInit {
  SubCategoryList: any = [];
  displayedColumns: string[] = [
    'En_Name',
    'CategoryId',
    'action',
  ];

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource = new MatTableDataSource<SubCategoryList[]>(this.SubCategoryList);

  showSearch: boolean = false;
  pageIndex: string | null | undefined;

  constructor(private _router: Router, private coreServices: CoreService, private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.SpinnerService.show();
    setTimeout(() => {
      this.getSubCategoryList();
    },500)
  }

  getSubCategoryList() {
    this.coreServices.getSubCategoryList()
      .subscribe((response: any) => {
        this.dataSource = new MatTableDataSource(response);
        this.SpinnerService.hide();
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

  fireFilterEvent(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.applyFilter(input);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openSearch() {
    this.showSearch = true;
  }

  navigateTo() {
    this._router.navigate(['/sub-category-details']);
  }
}
