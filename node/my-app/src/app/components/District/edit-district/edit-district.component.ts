import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { Location } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-edit-district',
  templateUrl: './edit-district.component.html',
  styleUrls: ['./edit-district.component.css']
})
export class EditDistrictComponent implements OnInit {
  today = new Date();
  DistrictId: any;
  states: any[] = [];

  constructor(private coreServices: CoreService, private route: ActivatedRoute, private location: Location,private SpinnerService: NgxSpinnerService) { }

  addDistrict = new FormGroup(({
    Name: new FormControl('', Validators.required),
    Hi_Name: new FormControl('', Validators.required),
    StateId: new FormControl(),
    // IsActive: new FormControl(true),
    // CreatedBy: new FormControl(3),
    // CreatedDate: new FormControl(),
    ModifiedBy : new FormControl(3),
    ModifiedDate : new FormControl(this.today),
  })
  );

  ngOnInit(): void {
    this.SpinnerService.show();
    setTimeout(()=>{
      this.SpinnerService.hide();
      this.route.params.subscribe(params => {
        this.DistrictId = params['Id'];
        console.log("ID : " + this.DistrictId);
        this.getDistrictId(this.DistrictId);
      })
      this.getStateList();
    },500)
  }

  getDistrictId(value: any) {
    this.coreServices.getDistrictById(value).subscribe((res: any) => {
      this.addDistrict.patchValue(res);
      // console.log(this.addCategory);
    });
  }

  getStateList() {
    this.coreServices.getStateDDList().subscribe((response: any) => {
      this.states = response;
    });
  }

  saveDistrict(addDistrict: any) {
    let districtData: any = {};
    districtData.DistrictId = parseInt(this.DistrictId);
    districtData.Name = this.addDistrict.value.Name;
    districtData.Hi_Name = this.addDistrict.value.Hi_Name;
    districtData.StateId = this.addDistrict.value.StateId;
    this.coreServices.updateDistrict(districtData).subscribe((result: any) => {
      console.log("Result:" + this.DistrictId + result);
      this.location.back();
    });
    // console.log("UPDATE FORM" + value); 
  }

  reloadPage() {
    window.location.reload();
  }
}
