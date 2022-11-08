import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { Location } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-edit-panchayat',
  templateUrl: './edit-panchayat.component.html',
  styleUrls: ['./edit-panchayat.component.css']
})

export class EditPanchayatComponent implements OnInit {
  today = new Date();
  PanchayatId : any;
  states: any[] = [];
  districts: any[] = [];
  blocks: any[] = [];

  constructor(private coreServices: CoreService, private route: ActivatedRoute, private location: Location,private SpinnerService: NgxSpinnerService) { }

  addPanchayat = new FormGroup(({
    Name: new FormControl('', Validators.required),
    Hi_Name: new FormControl('', Validators.required),
    StateId : new FormControl (),
    DistrictId : new FormControl (),
    BlockId : new FormControl (),
    // IsActive: new FormControl(true),
    // CreatedBy: new FormControl(3),
    // CreatedDate: new FormControl(this.today),
    // ModifiedBy : new FormControl(null),
    // ModifiedDate : new FormControl(null),
  })
  );

  ngOnInit(): void {
    this.SpinnerService.show();
    setTimeout(()=>{
      this.SpinnerService.hide();
      this.route.params.subscribe(params => {
        this.PanchayatId = params['Id'];
       console.log( "ID : " + this.PanchayatId);
       this.getPanchayatId(this.PanchayatId);
     });
    },500);
  }


  getPanchayatId(value: any) {
    this.coreServices.getPanchayatById(value).subscribe((res: any) => {
      this.addPanchayat.patchValue(res);
      // console.log(this.addCategory);
    });
    this.coreServices.getStateDDList().subscribe((response: any) => {
      this.states = response;
    });
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

  updatePanchayat(addBlock: any) {
    let PanchayatData : any = {};
    PanchayatData.PanchayatId = parseInt(this.PanchayatId);
    PanchayatData.Name = this.addPanchayat.value.Name;
    PanchayatData.Hi_Name = this.addPanchayat.value.Hi_Name;
    PanchayatData.StateId = this.addPanchayat.value.StateId;
    PanchayatData.DistrictId = this.addPanchayat.value.DistrictId;
    PanchayatData.BlockId = this.addPanchayat.value.BlockId;
    this.coreServices.updatePanchayat(PanchayatData).subscribe((result: any) => {
      console.log("Result:" + this.PanchayatId + result);
      this.location.back();
    });
    // console.log("UPDATE FORM" + value); 
  }

  reloadPage() {
    window.location.reload();
  }
}
