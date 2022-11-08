import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { CoreService } from 'src/app/services/core.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  states: any[] = [];
  districts: any[] = [];
  blocks: any[] = [];
  panchayats : any[] = [];
  checkValue : boolean = false;
  startDate = new Date(1990, 0, 1);
  today = new Date();


  previousImageSrc: string | undefined; // Used to store previous image
  deletePreviousImage: boolean | undefined = undefined; // Delete backend image on patch
  readonly photoMaxSize = 2 * 2 ** 20; // 2MB
  imageSrc: string | undefined; // Used to preview image
  itemForm!: FormGroup;
  

  addEventForm = new FormGroup(({
    Title: new FormControl(''),
    Description: new FormControl(''),
    BannerImageName: new FormControl(null),
    BlockId :new FormControl(),
    DistrictId: new FormControl(),
    PanchayatId: new FormControl(),
    StateId: new FormControl(),
    Publish : new FormControl(),
    StartDate: new FormControl(''),
    EndDate: new FormControl(''),
    IsActive: new FormControl(true),
    CreatedBy: new FormControl(3),
    CreatedDate: new FormControl(this.today),
    // ModifiedBy : new FormControl(null),
    // ModifiedDate : new FormControl(null),
  }))

  constructor(private coreServices: CoreService,private SpinnerService: NgxSpinnerService) {}

  ngOnInit(): void {
    this.SpinnerService.show();
    setTimeout(()=>{
      this.SpinnerService.hide();
      this.coreServices.getStateDDList().subscribe((response: any) => {
        this.states = response;
      });
    },500);
  }

  onChecked(e : any){
    this.checkValue = true;
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

  reloadPage() {
    this.addEventForm.reset();
  }

  saveEvent(value: any) {
    this.coreServices.addEvent(value).subscribe((result: any) => {
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
        // this.itemForm.patchValue({
        //   fileSource: reader.result,
        // });
      };
      this.deletePreviousImage = false;
    }
  }
  
}
