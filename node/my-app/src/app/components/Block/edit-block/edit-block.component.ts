import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { Location } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-edit-block',
  templateUrl: './edit-block.component.html',
  styleUrls: ['./edit-block.component.css']
})
export class EditBlockComponent implements OnInit {
  states: any[] = [];
  districts : any[] = [];
  today = new Date();
  BlockId : any;

  constructor(private coreServices: CoreService, private route: ActivatedRoute, private location: Location,private SpinnerService: NgxSpinnerService) { }

  addBlock = new FormGroup(({
    Name: new FormControl('', Validators.required),
    Hi_Name: new FormControl('', Validators.required),
    StateId : new FormControl(),
    DistrictId : new FormControl(),
    // IsActive: new FormControl(true),
    // CreatedBy: new FormControl(3),
    // CreatedDate: new FormControl(this.today),
    ModifiedBy : new FormControl(3),
    ModifiedDate : new FormControl(this.today),
  })
  );

  ngOnInit(): void {
    this.SpinnerService.show();
    setTimeout(()=>{
      this.SpinnerService.hide();
      this.route.params.subscribe(params => {
        this.BlockId = params['Id'];
       console.log( "ID : " + this.BlockId);
       this.getBlockId(this.BlockId);
     })
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

  getBlockId(value: any) {
    this.coreServices.getBlockById(value).subscribe((res: any) => {
      this.addBlock.patchValue(res);
      // console.log(this.addCategory);
    });
  }

  updateBlock(addBlock: any) {
    let blockData : any = {};
    blockData.BlockId = parseInt(this.BlockId);
    blockData.Name = this.addBlock.value.Name;
    blockData.Hi_Name = this.addBlock.value.Hi_Name;
    blockData.StateId = this.addBlock.value.StateId;
    blockData.DistrictId = this.addBlock.value.DistrictId;
    this.coreServices.updateBlock(blockData).subscribe((result: any) => {
      console.log("Result:" + this.BlockId + result);
      this.location.back();
    });
    // console.log("UPDATE FORM" + value); 
  }

  reloadPage() {
    window.location.reload();
  }

}
