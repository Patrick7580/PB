import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { CoreService } from 'src/app/services/core.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add-panchayat',
  templateUrl: './add-panchayat.component.html',
  styleUrls: ['./add-panchayat.component.css']
})
export class AddPanchayatComponent implements OnInit {
  states: any[] = [];
  districts: any[] = [];
  blocks: any[] = [];
  today = new Date();
  
  constructor(private coreServices : CoreService,private SpinnerService: NgxSpinnerService) {}

  ngOnInit(): void {
    this.SpinnerService.show();
    setTimeout(()=>{
      this.SpinnerService.hide();
      this.coreServices.getStateDDList().subscribe((response: any) => {
        this.states = response;
      });
    },500)
   
  }

  panchayatForm = new FormGroup(({
    Name: new FormControl(''),
    Hi_Name: new FormControl(''),
    StateId: new FormControl(),
    DistrictId: new FormControl(),
    BlockId : new FormControl(),
    IsActive: new FormControl(true),
    CreatedBy: new FormControl(3),
    CreatedDate: new FormControl(this.today),
    ModifiedBy: new FormControl(3),
    ModifiedDate: new FormControl(this.today),
  })
  );

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

  reloadPage() {
    this.panchayatForm.reset();
  }

  savePanchayat(value : any ) {
    this.coreServices.addPanchayat(value).subscribe((result: any) => {
      console.log(result);
    });
    console.log(value);
  }
}
