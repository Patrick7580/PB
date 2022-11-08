import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { CoreService } from 'src/app/services/core.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add-ward',
  templateUrl: './add-ward.component.html',
  styleUrls: ['./add-ward.component.css']
})
export class AddWardComponent implements OnInit {
  today = new Date();
  states: any[] = [];
  districts: any[] = [];
  blocks: any[] = [];
  panchayats : any[] = [];

  constructor(private coreServices : CoreService,private SpinnerService: NgxSpinnerService) { }
  
  addWard = new FormGroup (({
    Name: new FormControl(''),
    Hi_Name: new FormControl(''),
    BlockId :new FormControl(),
    DistrictId: new FormControl(),
    PanchayatId: new FormControl(),
    StateId: new FormControl(),
    WardNo: new FormControl(),
    IsActive: new FormControl(true),
    CreatedBy: new FormControl(3),
    CreatedDate: new FormControl(this.today),   
    ModifiedBy : new FormControl(3),
    ModifiedDate : new FormControl(this.today),
  }))

  ngOnInit(): void {
    this.SpinnerService.show();
    setTimeout(()=>{
      this.SpinnerService.hide();
      this.coreServices.getStateDDList().subscribe((response: any) => {
        this.states = response;
      });
    },500);
  }

  onStateChange(value: number) {
    console.log(value);
    this.coreServices.getDistrictDDList(value).subscribe((response: any) => {
      // this.isStateSelected = true;
      this.districts = response;
    });
  }

  onDistrictChange(value: number) {
    console.log(value);
    this.coreServices.getBlockDDList(value).subscribe((response: any) => {
      // this.isDistrictSelected = true;
      this.blocks = response;
    });
  }

  onBlockChange(value: number) {
    console.log(value);
    this.coreServices.getPanchayatDDList(value).subscribe((response: any) => {
      this.panchayats = response;
    });
  }

  reloadPage(){
   this.addWard.reset();
  }

  saveWard(value : any) {
    this.coreServices.addWard(value).subscribe((result: any) => {
      console.log(result);
    });
    console.log(value);
  }

}
