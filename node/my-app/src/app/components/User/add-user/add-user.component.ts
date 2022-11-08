import { Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { CoreService } from 'src/app/services/core.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})

export class AddUserComponent implements OnInit {
  today = new Date();
  districts: any[] = [];
  states: any[] = [];
  panchayats: any[] = [];
  wards: any[] = [];
  roles: any[] = [];
  blocks: any[] = [];


  previousImageSrc: string | undefined; // Used to store previous image
  deletePreviousImage: boolean | undefined = undefined; // Delete backend image on patch
  readonly photoMaxSize = 2 * 2 ** 20; // 2MB
  imageSrc: string | undefined; // Used to preview image
  itemForm!: FormGroup;

  constructor(private coreServices: CoreService,private SpinnerService: NgxSpinnerService) { }

  addUserForm = new FormGroup(({
    FirstName: new FormControl('', Validators.required),
    LastName: new FormControl('', Validators.required),
    ImageName: new FormControl('', Validators.required),
    BlockId: new FormControl('', Validators.required),
    DistrictId: new FormControl('', Validators.required),
    PanchayatId: new FormControl('', Validators.required),
    StateId: new FormControl('', Validators.required),
    WardId: new FormControl('', Validators.required),
    IsActive: new FormControl(true),
    CreatedBy: new FormControl(),
    CreatedDate: new FormControl(this.today),
    Phone :  new FormControl('', Validators.required),
    RoleId : new FormControl('', Validators.required),
    // ImageName : new FormControl (null)
    // ModifiedBy : new FormControl(null),
    // ModifiedDate : new FormControl(null),
  }))

  get f() { return this.addUserForm.controls; }

  ngOnInit(): void {
    this.SpinnerService.show();
    setTimeout(()=>{
      this.SpinnerService.hide();
      this.coreServices.getStateDDList().subscribe((response: any) => {
        this.states = response;
      });
      this.coreServices.getRoleList().subscribe((response: any) => {
        this.roles = response;
      });
    },500)
  }
  
  onStateChange(value: number) {
    console.log(value);
    this.coreServices.getDistrictDDList(value).subscribe((response: any) => {
      console.log(response);
      this.districts = response;
    });
  }

  onDistrictChange(value: number) {
    console.log(value);
    this.coreServices.getBlockDDList(value).subscribe((response: any) => {
      // console.log(response);
      this.blocks = response;
    });
  }

  onBlockChange(value: number) {
    console.log(value);
    this.coreServices.getPanchayatDDList(value).subscribe((response: any) => {
      // console.log(response);
      this.panchayats = response;

    });
  }

  onPanchayatChange(value : number) {
    this.coreServices.getWardDDList(value).subscribe((response: any) => {
      // console.log(response);
      this.wards = response;

    });
  }

  reloadPage() {
    window.location.reload();
  }

  saveUser(value: any) {
    this.coreServices.addUser(value).subscribe((result: any) => {
      console.log(result);
    });
    console.log(value);
  }

  onRemoveImage() {
    this.imageSrc = this.previousImageSrc;
    this.deletePreviousImage = false;
  }

  onAddImage(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.itemForm.patchValue({
          fileSource: reader.result,
        });
      };
      this.deletePreviousImage = false;
    }
  }

}
