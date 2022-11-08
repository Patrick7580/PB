import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { Location } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  today = new Date();
  UserId : any;
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

  constructor(private coreServices: CoreService, private route: ActivatedRoute, private location: Location, private SpinnerService: NgxSpinnerService){}

  addUser = new FormGroup(({
    FirstName: new FormControl('', Validators.required),
    LastName: new FormControl('', Validators.required),
    Phone : new FormControl ('',Validators.required),
    RoleId : new FormControl (),
    StateId : new FormControl (),
    DistrictId : new FormControl (),
    BlockId : new FormControl (),
    PanchayatId : new FormControl(),
    WardId : new FormControl (),
    ImageName : new FormControl(),
  })
  );

  ngOnInit(): void {
    this.SpinnerService.show();
    setTimeout(()=>{
      this.SpinnerService.hide();
      this.route.params.subscribe(params => {
        this.UserId = params['Id'];
       console.log( "ID : " + this.UserId);
       this.getUserId(this.UserId);
     });
     this.coreServices.getStateDDList().subscribe((response: any) => {
       this.states = response;
     });
     this.coreServices.getRoleList().subscribe((response: any) => {
       this.roles = response;
     });
    },500)
  }


  getUserId(value: any) {
    this.coreServices.getUserById(value).subscribe((res: any) => {
      this.addUser.patchValue(res);
      // console.log(this.addCategory);
    });
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

  updateUser(addWard: any) {
    let userData : any = {};
    userData.UserId = parseInt(this.UserId);
    userData.FirstName = this.addUser.value.FirstName;
    userData.LastName = this.addUser.value.LastName;
    userData.Phone = this.addUser.value.Phone;
    userData.RoleId = this.addUser.value.RoleId;
    userData.StateId = this.addUser.value.StateId;
    userData.DistrictId = this.addUser.value.DistrictId;
    userData.BlockId = this.addUser.value.BlockId;
    userData.PanchayatId = this.addUser.value.PanchayatId;
    userData.WardId = this.addUser.value.WardId;
    userData.ImageName = this.addUser.value.ImageName;

    this.coreServices.updateUser(userData).subscribe((result: any) => {
      console.log("Result:" + this.UserId + result);
      this.location.back();
    });
    // console.log("UPDATE FORM" + value); 
  }

  reloadPage() {
    window.location.reload();
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
        // this.itemForm.patchValue({
        //   fileSource: reader.result,
        // });
      };
      this.deletePreviousImage = false;
    }
  }
}
