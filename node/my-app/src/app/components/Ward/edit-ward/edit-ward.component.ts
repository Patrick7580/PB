import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CoreService } from 'src/app/services/core.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-edit-ward',
  templateUrl: './edit-ward.component.html',
  styleUrls: ['./edit-ward.component.css']
})

export class EditWardComponent implements OnInit {
  today = new Date();
  WardId : any;
  states: any[] = [];
  districts: any[] = [];
  blocks: any[] = [];
  panchayats : any[] = [];
  constructor(private coreServices: CoreService, private route: ActivatedRoute, private location: Location,private SpinnerService: NgxSpinnerService) { }

  addWard = new FormGroup(({
    Name: new FormControl('', Validators.required),
    Hi_Name: new FormControl('', Validators.required),
    WardNo : new FormControl (),
    StateId : new FormControl (),
    DistrictId : new FormControl (),
    BlockId : new FormControl (),
    PanchayatId : new FormControl (),
    IsActive: new FormControl(true),
    CreatedBy: new FormControl(3),
    CreatedDate: new FormControl(this.today),
    ModifiedBy : new FormControl(3),
    ModifiedDate : new FormControl(this.today),
  })
  );

  ngOnInit(): void {

    this.SpinnerService.show();
    setTimeout(()=>{
      this.SpinnerService.hide();
      this.route.params.subscribe(params => {
        this.WardId = params['Id'];
       console.log( "ID : " + this.WardId);
       this.getWardId(this.WardId);
     })
     this.coreServices.getStateDDList().subscribe((response: any) => {
       this.states = response;
     });
    },500)
    
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


  getWardId(value: any) {
    this.coreServices.getWardById(value).subscribe((res: any) => {
      this.addWard.patchValue(res);
      // console.log(this.addCategory);
    });
  }

  updateWard(addWard: any) {
    let wardData : any = {};
    
    wardData.WardId = parseInt(this.WardId);
    wardData.Name = this.addWard.value.Name;
    wardData.Hi_Name = this.addWard.value.Hi_Name;
    wardData.WardNo = this.addWard.value.WardNo;
    wardData.StateId = this.addWard.value.StateId;
    wardData.DistrictId = this.addWard.value.DistrictId;
    wardData.BlockId = this.addWard.value.BlockId;
    wardData.PanchayatId = this.addWard.value.PanchayatId;

    this.coreServices.updateWard(wardData).subscribe((result: any) => {
      console.log("Result:" + this.WardId + result);
      this.location.back();
    });
    // console.log("UPDATE FORM" + value); 
  }

  reloadPage() {
    window.location.reload();
  }
}
