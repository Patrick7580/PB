import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-ward-details',
  templateUrl: './ward-details.component.html',
  styleUrls: ['./ward-details.component.css']
})
export class WardDetailsComponent implements OnInit {

  subCategoryForm!: FormGroup;
  showSearch: boolean = false;
  WardId: any;
  Name: any;
  State: any;
  District: any;
  Block: any;
  Panchayat: any;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  pageIndex: string | null | undefined;

  constructor(private coreServices: CoreService, private route: ActivatedRoute, private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.SpinnerService.show();
    setTimeout(() => {
      this.SpinnerService.hide();
      this.route.params.subscribe(params => {
        this.WardId = params['Id'];
        console.log("ID : " + this.WardId);
        this.getWardId(this.WardId);
      });
    }, 200)
  }

  getWardId(value: any) {
    this.coreServices.getWardById(value).subscribe((res: any) => {
      this.Name = res.Name;
      this.Panchayat = res.TblPanchayat.Name;
      this.District = res.TblDistrict.Name;
      this.State = res.TblState.Name;
      this.Block = res.TblBlock.Name;
    });
  }

  reloadPage() {
    window.location.reload();
  }

}
