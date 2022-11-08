import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { Location } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})

export class EditEventComponent implements OnInit {
  today = new Date();
  EventId : any;
  states: any[] = [];
  districts: any[] = [];
  blocks: any[] = [];
  panchayats : any[] = [];
  checkValue : boolean = false;

  previousImageSrc: string | undefined; // Used to store previous image
  deletePreviousImage: boolean | undefined = undefined; // Delete backend image on patch
  readonly photoMaxSize = 2 * 2 ** 20; // 2MB
  imageSrc: string | undefined; // Used to preview image
  itemForm!: FormGroup;
  
  constructor(private coreServices: CoreService, private route: ActivatedRoute, private location: Location,private SpinnerService: NgxSpinnerService) { }

  addEvent = new FormGroup(({
    Title: new FormControl('', Validators.required),
    Description: new FormControl('', Validators.required),
    StartDate : new FormControl ('',Validators.required),
    EndDate : new FormControl (),
    StateId : new FormControl (),
    DistrictId : new FormControl (),
    BlockId : new FormControl (),
    PanchayatId : new FormControl (),
    Publish : new FormControl(),
    BannerImageName : new FormControl (),
    CreatedBy : new FormControl (),
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
        this.EventId = params['Id'];
       console.log( "ID : " + this.EventId);
       this.getEventId(this.EventId);
     });
     this.coreServices.getStateDDList().subscribe((response: any) => {
       this.states = response;
     });
    },500)
  }

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

  onBlockChange(value: number) {
    console.log(value);
    this.coreServices.getPanchayatDDList(value).subscribe((response: any) => {
      this.panchayats = response;
    });
  }



  getEventId(value: any) {
    this.coreServices.getEventById(value).subscribe((res: any) => {
      this.addEvent.patchValue(res);
      // console.log(this.addCategory);
    });
  }

  updateEvent(addWard: any) {
    let eventData : any = {};
    eventData.EventId = parseInt(this.EventId);
    eventData.Title = this.addEvent.value.Title;
    eventData.Description = this.addEvent.value.Description;
    eventData.StartDate = this.addEvent.value.StartDate;
    eventData.EndDate = this.addEvent.value.EndDate;
    eventData.Publish = this.addEvent.value.Publish;
    this.coreServices.updateEvent(eventData).subscribe((result: any) => {
      console.log("Result:" + this.EventId + result);
      this.location.back();
    });
    // console.log("UPDATE FORM" + value); 
  }

  onChecked(e : any){
    this.checkValue = true;
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
