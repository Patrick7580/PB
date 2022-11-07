import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { CoreService } from 'src/app/services/core.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add-block',
  templateUrl: './add-block.component.html',
  styleUrls: ['./add-block.component.css']
})

export class AddBlockComponent implements OnInit {
  states: any[] = [];
  districts : any[] = [];
  today = new Date();
  isStateSelected: boolean = false;

  constructor(private coreServices: CoreService,private SpinnerService: NgxSpinnerService) {}

  addBlock = new FormGroup (({
    Name: new FormControl(''),
    Hi_Name: new FormControl(''),
    StateId: new FormControl(),
    DistrictId : new FormControl(),
    IsActive: new FormControl(true),
    CreatedBy: new FormControl(3),
    CreatedDate: new FormControl(this.today),
    ModifiedBy : new FormControl(3),
    ModifiedDate : new FormControl(this.today),
  })
  );

  ngOnInit(): void {
    this.isStateSelected = false;
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
      this.isStateSelected = true;
      // console.log(response);
      this.districts = response;
    });
  }

  reloadPage() {
    this.addBlock.reset();
  }

  saveBlock(value : any ) {
    this.coreServices.addBlock(value).subscribe((result: any) => {
      console.log(result);
    });
    console.log(value);
  }
}
