import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ComplaintList } from 'src/app/models/complaint-list';

export interface PeriodicElement {
  category: string;
  subCategory: string;
  complainUser: string;
  createDate: string;
  assignTo: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    category: 'Yoga Day',
    subCategory: 'YOGA',
    complainUser: '',
    createDate: '07/07/2022',
    assignTo: '07/07/2022',
    status: 'Salkanpur',
  },
  {
    category: 'Jal Mahotsav Day',
    subCategory: 'YOGA',
    complainUser: '',
    createDate: '07/07/2022',
    assignTo: '07/07/2022',
    status: 'Salkanpur',
  },
];
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  subCategoryForm!: FormGroup;
  showSearch: boolean = false;
  UserId: any;
  FirstName: any;
  LastName: any;
  Phone: any;
  Panchayat: any;
  Ward : any;
  Role : any;
  ComplaintList: any = [];
  displayedColumns: string[] = [
    'category',
    'subCategory',
    'complainUser',
    'createDate',
    'assignTo',
    'status',
    'action',
  ];

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  dataSource = new MatTableDataSource<ComplaintList[]>(this.ComplaintList);
  pageIndex: string | null | undefined;

  constructor(private coreServices: CoreService, private route: ActivatedRoute, private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.SpinnerService.show();
    setTimeout(()=>{
      this.SpinnerService.hide();
    this.route.params.subscribe(params => {
      this.UserId = params['Id'];
      console.log("ID : " + this.UserId);
      this.getUserId(this.UserId);
      this.getMyComplaint(this.UserId);
    });
  },200)
  }

  getUserId(value: any) {
    this.coreServices.getUserById(value).subscribe((res: any) => {
      // console.log(res);
      this.FirstName = res.FirstName;
      this.LastName = res.LastName;
      this.Phone = res.Phone;
      this.Panchayat = res.TblPanchayat.Name;
      this.Ward = res.TblWard.Name;
      this.Role = res.TblRole.Name;
    });
  }
  
  getMyComplaint(value : number) {
    this.coreServices.GetMyComplaintListByUserId(value).subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
      this.SpinnerService.hide();
       console.log(this.dataSource + "Complainst got");
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

  saveDetails() { }

  reloadPage() {
    window.location.reload();
  }

  openSearch() {
    this.showSearch = true;
  }


}
