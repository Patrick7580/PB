import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ComplaintList } from 'src/app/models/complaint-list';
import { CoreService } from 'src/app/services/core.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-complaint-list',
  templateUrl: './complaint-list.component.html',
  styleUrls: ['./complaint-list.component.css']
})

export class ComplaintListComponent implements OnInit {
  showSearch : boolean = false;
  ComplaintList: any = [];
  displayedColumns: string[] = [
    'Title',
    'CategoryId',
    'SubCategoryId',
    'ComplaintUserId',
    'CreatedDate',
    'AssignUserId',
    'StatusId',
    'action',
  ];

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource = new MatTableDataSource<ComplaintList[]>(this.ComplaintList);

  pageIndex: string | null | undefined;

  constructor(private coreServices : CoreService,private SpinnerService: NgxSpinnerService) {}

  ngOnInit(): void {
    this.SpinnerService.show();
    setTimeout(()=>{
      this.getData();
    },200)
  }

  fireFilterEvent(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.applyFilter(input);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getData() {
    this.coreServices.getComplaintList().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
      this.SpinnerService.hide();
       console.log(this.dataSource + "Complainst got");
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
