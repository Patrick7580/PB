import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-edit-complaint',
  templateUrl: './edit-complaint.component.html',
  styleUrls: ['./edit-complaint.component.css']
})
export class EditComplaintComponent implements OnInit {
  today = new Date();
  ComplaintsId: any;
  Status: any[] = [];
  assignToUsers: any[] = [];

  constructor(private coreServices: CoreService, private route: ActivatedRoute, private location: Location, private SpinnerService: NgxSpinnerService) { }

  addComplaint = new FormGroup(({
    StatusId: new FormControl('', Validators.required),
    AssignUserId: new FormControl('', Validators.required),
    Title: new FormControl(''),
    Description: new FormControl(''),
    ComplaintUserId: new FormControl(),
    CreatedDate: new FormControl(),
    TblCategories: new FormGroup(({
      En_Name: new FormControl(),
    })),
    TblSubCategories: new FormGroup(({
      En_Name: new FormControl(),
    })),
    Comment: new FormControl(),
    // IsActive: new FormControl(true),
    // CreatedBy: new FormControl(3),
    // CreatedDate: new FormControl(this.today),
    // ModifiedBy : new FormControl(null),
    // ModifiedDate : new FormControl(null),
  })
  );

  ngOnInit(): void {
    this.SpinnerService.show();
    setTimeout(() => {
      this.SpinnerService.hide();
      this.route.params.subscribe(params => {
        this.ComplaintsId = params['Id'];
        console.log("ID : " + this.ComplaintsId);
        this.getComplaintId(this.ComplaintsId);
      });
      this.coreServices.GetComplaintStatus().subscribe((res: any) => {
        this.Status = res;
        // console.log(this.addCategory);
      });
    },500)
  }


  getComplaintId(value: any) {
    this.coreServices.getComplaintById(value).subscribe((res: any) => {
      this.addComplaint.patchValue(res);
      this.getAssignTo(this.addComplaint.value.ComplaintUserId);
      // console.log(this.addCategory);
    });
  }

  getAssignTo(value: any) {
    this.coreServices.getAssignToById(value).subscribe((res: any) => {
      this.assignToUsers = res;
    });
  }

  updateComplaint(addWard: any) {
    let complaintData: any = {};
    complaintData.ComplaintsId = parseInt(this.ComplaintsId);
    complaintData.StatusId = this.addComplaint.value.StatusId;
    // complaintData.ComplaintUserId = this.addComplaint.value.ComplaintUserId;
    complaintData.AssignUserId = this.addComplaint.value.AssignUserId;
    this.coreServices.updateComplaint(complaintData).subscribe((result: any) => {
      console.log("Result:" + this.ComplaintsId + result);
      this.location.back();
    });
    // console.log("UPDATE FORM" + value); 
  }

  reloadPage() {
    window.location.reload();
  }

}
