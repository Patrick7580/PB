import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-sub-category',
  templateUrl: './edit-sub-category.component.html',
  styleUrls: ['./edit-sub-category.component.css']
})

export class EditSubCategoryComponent implements OnInit {
  today = new Date();
  SubCategoryId: any;
  categories : any[] = [];

  constructor(private coreServices: CoreService, private route: ActivatedRoute, private location: Location) { }

  addSubCategory = new FormGroup(({
    En_Name: new FormControl('', Validators.required),
    Hi_Name: new FormControl('', Validators.required),
    CategoryId: new FormControl(),
    // IsActive: new FormControl(true),
    // CreatedBy: new FormControl(3),
    // CreatedDate: new FormControl(this.today),
    // ModifiedBy : new FormControl(null),
    // ModifiedDate : new FormControl(null),
  })
  );

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.SubCategoryId = params['Id'];
      console.log("ID : " + this.SubCategoryId);
      this.getSubCategoryId(this.SubCategoryId);
    });
    this.coreServices.getCategoryDDList().subscribe((result: any) => {
      this.categories = result ;
    });
  }

  getSubCategoryId(value: any) {
    this.coreServices.getSubCategoryById(value).subscribe((res: any) => {
      this.addSubCategory.patchValue(res);
      // console.log(this.addCategory);
    });
  }

  saveSubCategory(addSubCategory: any) {
    let subCategoryData: any = {};
    subCategoryData.SubCategoryId = parseInt(this.SubCategoryId);
    subCategoryData.En_Name = this.addSubCategory.value.En_Name;
    subCategoryData.Hi_Name = this.addSubCategory.value.Hi_Name;
    subCategoryData.CategoryId = this.addSubCategory.value.CategoryId;
    this.coreServices.updateSubCategory(subCategoryData).subscribe((result: any) => {
      console.log("Result:" + this.SubCategoryId + result);
      this.location.back();
    });
    // console.log("UPDATE FORM" + value); 
  }

  reloadPage() {
    window.location.reload();
  }
}