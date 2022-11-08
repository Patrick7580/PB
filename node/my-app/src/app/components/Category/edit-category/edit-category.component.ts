import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { Location } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  today = new Date();
  CategoryId : any;

  constructor(private coreServices: CoreService, private route: ActivatedRoute,private location: Location,private SpinnerService: NgxSpinnerService){}

  addCategory = new FormGroup(({
    En_Name: new FormControl('', Validators.required),
    Hi_Name: new FormControl('', Validators.required),
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
        this.CategoryId = params['Id'];
       console.log( "ID : " + this.CategoryId);
       this.getCategoryId(this.CategoryId);
     });
    },500)
   
  }


  getCategoryId(value: any) {
    this.coreServices.getCategoryById(value).subscribe((res: any) => {
      this.addCategory.patchValue(res);
      // console.log(this.addCategory);
    });
  }

  saveCategory(addCategory: any) {
    let categoryData : any = {};
    categoryData.CategoryId = parseInt(this.CategoryId);
    categoryData.En_Name = this.addCategory.value.En_Name;
    categoryData.Hi_Name = this.addCategory.value.Hi_Name;

    this.coreServices.updateCategory(categoryData).subscribe((result: any) => {
      console.log("Result:" + this.CategoryId + result);
      this.location.back();
    });
    // console.log("UPDATE FORM" + value); 
  }

  reloadPage() {
    window.location.reload();
  }

}