import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BlockList } from 'src/app/models/block-list';
import { CoreService } from 'src/app/services/core.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.css']
})
export class BlockListComponent implements OnInit {
  showSearch : boolean = false;
  BlockList: any = [];
  displayedColumns: string[] = [
    'Name',
    'DistrictId',
    'StateId',
    'action',
  ];

  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource = new MatTableDataSource<BlockList[]>(this.BlockList);

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  pageIndex: string | null | undefined;

  constructor(private coreServices : CoreService,private SpinnerService: NgxSpinnerService) {}

  ngOnInit(): void {
    this.SpinnerService.show();
    setTimeout(()=>{
      this.getBlock();
    },500)
  }

  getBlock(){
    this.coreServices
    .getBlockList()
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

  openSearch(){
    this.showSearch = true;
  }

  onPaginateChange(event: any) {
    this.pageIndex = event.pageIndex;
    localStorage.setItem('', JSON.stringify(this.pageIndex));
  }
}
