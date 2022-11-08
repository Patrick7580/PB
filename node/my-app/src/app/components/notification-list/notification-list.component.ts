import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationList } from 'src/app/models/notification-list';
import { CoreService } from 'src/app/services/core.service';

export interface PeriodicElement {
  type: string;
  eventId: string;
  complaintId: string;
  title: string;
  image: string;
  seen: string;
  createdBy: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     type: "Festival",
//     eventId: "6551",
//     complaintId: "45",
//     title: "Festival",
//     image: "",
//     seen: "Yes",
//     createdBy: "Admin Dept.",
//   },
//   {
//     type: "Festival",
//     eventId: "6551",
//     complaintId: "45",
//     title: "Festival",
//     image: "",
//     seen: "Yes",
//     createdBy: "Admin Dept.",
//   },
//   {
//     type: "Festival",
//     eventId: "6551",
//     complaintId: "45",
//     title: "Festival",
//     image: "",
//     seen: "Yes",
//     createdBy: "Admin Dept.",
//   },
//   {
//     type: "Festival",
//     eventId: "6551",
//     complaintId: "45",
//     title: "Festival",
//     image: "",
//     seen: "Yes",
//     createdBy: "Admin Dept.",
//   },
// ];
@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
  showSearch: boolean = false;
  NotificationList: any = [];
  displayedColumns: string[] = ['Type','EventId','ComplaintId','En_Title','ImageName','Seen','CreatedBy','action',];
  isRtl: any;
  displayedColumnsSmallMob: string[] = ['Type'];

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource = new MatTableDataSource<NotificationList[]>(this.NotificationList);

  pageIndex = 0;

  constructor(private coreServices : CoreService) { }

  ngOnInit(): void {
      this.getData();
  }

  getData() { 
    this.coreServices.getNotificationList().subscribe(( response : any) => {
    this.dataSource = new MatTableDataSource (response);
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

  openSearch() {
    this.showSearch = true;
  }
 

  onPaginateChange(event: any) {
    this.pageIndex = event.pageIndex;
    localStorage.setItem('', JSON.stringify(this.pageIndex));
  }

}
