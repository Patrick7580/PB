import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { UserList } from 'src/app/models/user-list';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import * as _ from 'lodash';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})

export class UserListComponent implements OnInit {
  isLoading: boolean = false;
  isFilterOpen: boolean = false;
  isShowData: boolean = false;
  isStateSelected: boolean = false;
  isDistrictSelected: boolean = false;
  isBlockSelected: boolean = false;
  isPanchayatSelected: boolean = false;
  isWardSelected: boolean = false;
  UserList: any = [];
  pageIndex = 0;
  selectFormControl = new FormControl('', Validators.required);
  displayedColumns: string[] = ['FirstName', 'LastName', 'Phone', 'RoleTypeName', 'PanchayatName', 'WardName', 'action'];

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource = new MatTableDataSource<UserList[]>(this.UserList);

  WardData = new FormControl();
  PanchayatData = new FormControl();
  DistrictData = new FormControl();
  RoleData = new FormControl();
  BlockData = new FormControl();
  StateData = new FormControl();

  districts: any[] = [];
  states: any[] = [];
  panchayats: any[] = [];
  wards: any[] = [];
  roles: any[] = [];
  blocks: any[] = [];

  apiResponse: any = [];

  constructor(private coreServices: CoreService,private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.SpinnerService.show();
    setTimeout(()=>{
      this.SpinnerService.hide();
      this.getAllUserList();
      this.getUserDropdown();
    },500);
  }

  getAllUserList() {
    // this.isLoading = true;
    this.coreServices
      .getUserList()
      .subscribe((response: any) => {
        // this.isLoading = false;
        this.apiResponse = response;
        this.dataSource = new MatTableDataSource(response);
        console.log(this.dataSource);
        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        })
      });
  }



  onStateChange(value: number) {
    console.log(value);
   
    this.coreServices.getDistrictDDList(value).subscribe((response: any) => {
      this.isStateSelected = true;
      console.log(response);
      this.districts = response;
    });

    this.dataSource.data = this.dataSource.data.filter((x: any) => x.StateId == value);
    console.log(this.dataSource.data);
    // this.updateDataSource();
  }

  onDistrictChange(value: number) {
    console.log(value);
   
    this.coreServices.getBlockDDList(value).subscribe((response: any) => {
      this.isDistrictSelected = true;
      // console.log(response);
      this.blocks = response;
    });

    this.dataSource.data = this.dataSource.data.filter((x: any) => x.DistrictId == value);
    console.log(this.dataSource.data);
  }

  onBlockChange(value: number) {
    console.log(value);
  
    this.coreServices.getPanchayatDDList(value).subscribe((response: any) => {
      this.isBlockSelected = true;
      // console.log(response);
      this.panchayats = response;
    });
    
    this.dataSource.data = this.dataSource.data.filter((x: any) => x.BlockId == value);
    console.log(this.dataSource.data);
  }

  onPanchayatChange(value: number) {
    console.log(value);
    this.dataSource.data = this.dataSource.data.filter((x: any) => x.PanchayatId == value); 
    this.coreServices.getWardDDList(value).subscribe((response: any) => {
      this.isPanchayatSelected = true;
      // console.log(response);
      this.getRoleList();
      this.wards = response;
    });
   
    console.log(this.dataSource.data);
  }

  getRoleList() {
    this.coreServices.getRoleList().subscribe((response: any) => {
      this.isWardSelected = true;
      this.roles = response;
    });
  }

  onWardChange(value: number){
    this.dataSource.data = this.dataSource.data.filter((x: any) => x.WardId == value);
  }

  onRoleChange(value: number) {
    this.dataSource.data = this.dataSource.data.filter((x: any) => x.RoleId == value);
  }

  getUserDropdown() {
    this.coreServices.getStateDDList().subscribe((response: any) => {
      this.states = response;
    });
  }

  fireFilterEvent(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.applyFilter(input);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openfilter() {
    this.isFilterOpen = true;
  }

  showTableData() {
    this.isShowData = true;
    console.log("DATA FILter clicked");
  }

  onPaginateChange(event: any) {
    this.pageIndex = event.pageIndex;
    localStorage.setItem('', JSON.stringify(this.pageIndex));
  }
}
