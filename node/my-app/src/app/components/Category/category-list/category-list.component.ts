import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryList } from 'src/app/models/category-list';
import { CoreService } from 'src/app/services/core.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})

export class CategoryListComponent implements OnInit {
  isLoading: boolean = false;
  showSearch: boolean = false;
  displayedColumns: string[] = ['En_Name', 'action'];
  CategoryList: any = [];
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  dataSource = new MatTableDataSource<CategoryList[]>(this.CategoryList);

  constructor(private coreServices: CoreService, private router: Router, private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.SpinnerService.show();
    setTimeout(() => {
      this.getData();
    }, 500)

  }

  getData() {
    this.coreServices.getCategoryList()
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
}
