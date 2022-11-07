import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import { CoreService } from 'src/app/services/core.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  today = new Date();
  
  constructor(private coreServices: CoreService, private SpinnerService: NgxSpinnerService) {}

  addCategory = new FormGroup (({
    En_Name: new FormControl('', Validators.required ),
    Hi_Name: new FormControl('', Validators.required ),
    IsActive: new FormControl(true),
    CreatedBy: new FormControl(3),
    CreatedDate: new FormControl(this.today),
    // ModifiedBy : new FormControl(null),
    // ModifiedDate : new FormControl(null),
  })
  );


  ngOnInit(): void {
    this.SpinnerService.show();
    setTimeout(()=>{
      this.SpinnerService.hide();
    },500)
  }

  saveCategory(value : any ) {
    this.coreServices.addCategory(value).subscribe((result: any) => {
      console.log(result);
    });
    console.log(value);
  }

  reloadPage(){
    window.location.reload();
   }
}
