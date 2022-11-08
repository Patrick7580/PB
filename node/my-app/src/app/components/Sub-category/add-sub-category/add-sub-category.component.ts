import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup, Validators} from '@angular/forms';
import { CoreService } from 'src/app/services/core.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.css']
})
export class AddSubCategoryComponent implements OnInit {
  today = new Date();
  categories : any[] = [];
  subCategories: string[] = ['Madhya Pradesh', 'Uttar Pradesh', 'Maharastra'];

  constructor(private coreServices : CoreService,private SpinnerService: NgxSpinnerService) {}
  
  addSubCategory = new FormGroup (({
    En_Name: new FormControl('', Validators.required ),
    Hi_Name: new FormControl('', Validators.required ),
    CategoryId :new FormControl('', Validators.required ),
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
      this.coreServices.getCategoryDDList().subscribe((result: any) => {
        this.categories = result ;
      });
    },500)
  
  }

  saveSubCategory(value : any ) {
    this.coreServices.addSubCategory(value).subscribe((result: any) => {
      console.log(result);
    });
    console.log(value);
  }

  reloadPage(){
    window.location.reload();
   }
}
