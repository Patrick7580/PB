import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EventList } from 'src/app/models/event-list';
import { CoreService } from 'src/app/services/core.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})

export class EventListComponent implements OnInit {
  showSearch:boolean= false;
  EventList: any = [];
  displayedColumns: string[] = [
    'Title',
    'Description',
    'BannerImage',
    'StartDate',
    'EndDate',
    'PanchayatId',
    'Publish',
    'action',
  ];


  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource = new MatTableDataSource<EventList[]>(this.EventList);

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;


  pageIndex: string | null | undefined;

  constructor( private coreServices : CoreService,private SpinnerService: NgxSpinnerService) {}

  ngOnInit(): void {
    this.SpinnerService.show();
    setTimeout(()=>{
      this.getData();
    },500)
      
  }

  fireFilterEvent(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.applyFilter(input);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getData() {
      this.coreServices
      .getEventList()
      .subscribe((response: any) => {
        this.SpinnerService.hide();
        this.dataSource = new MatTableDataSource(response);
         console.log(this.dataSource + "Complainst got");

        console.log(this.dataSource);
        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        })
      });
  }

  openSearch(){
    this.showSearch = true;
  }
  onPaginateChange(event: any) {
    this.pageIndex = event.pageIndex;
    localStorage.setItem('', JSON.stringify(this.pageIndex));
  }

}
