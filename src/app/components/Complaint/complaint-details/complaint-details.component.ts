import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-complaint-details',
  templateUrl: './complaint-details.component.html',
  styleUrls: ['./complaint-details.component.css']
})
export class ComplaintDetailsComponent implements OnInit {
  ComplaintsId : any;
  Category : any;
  subCategory : any ;
  Status : any ;
  assignTo : any ;
  createdDate : any ;
  complainUser : any ;

  constructor(private coreServices: CoreService, private route: ActivatedRoute, private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.SpinnerService.show();
    setTimeout(() => {
      this.SpinnerService.hide();
      this.route.params.subscribe(params => {
        this.ComplaintsId = params['Id'];
        console.log("ID : " + this.ComplaintsId);
        this.getComplaintId(this.ComplaintsId);
      });
    },500)
  }

  getComplaintId(value: any) {
    this.coreServices.getComplaintById(value).subscribe((res: any) => {
      this.Category = res.TblCategories.En_Name;
      this.subCategory = res.TblSubCategories.En_Name;
      this.Status = res.TblStatu.En_Name;
      this.complainUser = res.ComplaintUser.FirstName;
      this.assignTo = res.AssignUser.FirstName;
      this.createdDate = res.CreatedDate;
    });
  }

  reloadPage(){
    window.location.reload();
  }

}
