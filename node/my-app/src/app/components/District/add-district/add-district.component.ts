import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CoreService } from 'src/app/services/core.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add-district',
  templateUrl: './add-district.component.html',
  styleUrls: ['./add-district.component.css']
})
export class AddDistrictComponent implements OnInit {
  today = new Date();
  states: any[] = [];

  constructor(private coreServices : CoreService,private SpinnerService: NgxSpinnerService) { }
  
  addDistrict = new FormGroup (({
    Name: new FormControl(''),
    Hi_Name: new FormControl(''),
    CityId :new FormControl(),
    StateId: new FormControl(),
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
    },500)
   
  }

  reloadPage(){
  //  window.location.reload();
   this.addDistrict.reset();
  }

  saveDistrict(value : any ) {
    this.coreServices.addDistrict(value).subscribe((result: any) => {
      console.log(result);
    });
    console.log(value);
  }
}
