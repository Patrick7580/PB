import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { multi } from 'src/app/models/graphdata';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { ApexNonAxisChartSeries, ApexPlotOptions, ApexChart, ApexFill, ChartComponent, ApexStroke } from "ng-apexcharts";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserList } from 'src/app/models/user-list';
import { CoreService } from 'src/app/services/core.service';
import { ComplaintList } from 'src/app/models/complaint-list';
import { NgxSpinnerService } from "ngx-spinner";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};

@Component({
  selector: 'app-region-wise-report',
  templateUrl: './region-wise-report.component.html',
  styleUrls: ['./region-wise-report.component.css'],
})

export class RegionWiseReportComponent implements OnInit {

  UserList: any = [];
  ComplaintList: any = [];
  districts: any = [];
  states: any = [];
  panchayats: any = [];
  blocks: any = [];
  isloading: boolean = true;
  isStateSelected: boolean = false;
  isDistrictSelected: boolean = false;
  isBlockSelected: boolean = false;
  isPanchayatSelected: boolean = false;

  selectedPanchayat = new FormControl();
  selectedDistrict = new FormControl();
  selectedBlock = new FormControl();
  selectedState = new FormControl();

  WardCounts: any;
  UserCounts: any;
  EventCounts: any;
  PanchayatCounts: any;
  ComplaintCounts: any;

  DraftEvents: any;
  CompletedEvents: any;
  TotalEvents: any;

  public chartOptions !: Partial<ChartOptions> | any;
  public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [350, 450, 100] }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  // -------------------GRAPH-------------------------------------

  multi: any[] = [];
  view: [number, number] = [700, 400];;

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = '';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Emission';
  animations: boolean = true;

  colorScheme = {
    domain: ['#616cb1', '#cc6baa', '#87b55d', '#df5331', '#ffd645', '#f48441']
  };

  // ---------------------------Form /Tables -------------------------------------

  regionFilter!: FormGroup;
  myControl = new FormControl('');
  selectedFW = new FormControl();
  frameworks: string[] = ['Madhya Pradesh', 'Uttar Pradesh', 'Maharastra'];
  showSearch: boolean = false;
  showResolvedSearch: boolean = false;
  showRecentSearch: boolean = false;
  pageIndex = 0;

  displayedColumnRecent: string[] = ['Title', 'ComplaintUserId', 'CreatedDate', 'AssignUserId', 'StatusId'];
  displayedColumnsResolved: string[] = ['Title', 'ComplaintUserId', 'CreatedDate', 'AssignUserId', 'StatusId'];
  displayedColumnsUser: string[] = ['ProfileImage', 'FirstName', 'Phone', 'RoleId', 'PanchayatId', 'WardId'];

  @ViewChild('MatPaginator1') paginator1: any = MatPaginator;
  @ViewChild('MatPaginator2') paginator2: any = MatPaginator;
  @ViewChild('MatPaginator3') paginator3: any = MatPaginator;
  @ViewChild('sorter1') sorter1!: MatSort;
  @ViewChild('sorter2') sorter2!: MatSort;
  @ViewChild('sorter3') sorter3!: MatSort;
  @ViewChild("chart") chart: ChartComponent | any;

  RecentDataSource = new MatTableDataSource<ComplaintList[]>(this.ComplaintList);
  ResolvedDataSource = new MatTableDataSource<ComplaintList[]>(this.ComplaintList);
  dataSource = new MatTableDataSource<UserList[]>(this.UserList);

  constructor(private coreServices: CoreService, private formBuilder: FormBuilder,private SpinnerService: NgxSpinnerService) {
    Object.assign(this, { multi });
    this.getEventChartData();
  }

  ngOnInit(): void {
    this.regionFilter = this.formBuilder.group({
      selectedFW: ['', Validators.required],
    });
    this.isloading = true;
    this.SpinnerService.show();
    setTimeout(() => {
      this.SpinnerService.hide();
      this.getUserList();
      this.getResolvedComplaints();
      this.getRecentComplaints();
      this.getUserDropdown();
      this.getTotalCounts();
    }, 500)
  }

  getTotalCounts() {
    this.coreServices.getRegionCounts().subscribe((CountData: any) => {
      this.WardCounts = CountData.WardCounts;
      this.UserCounts = CountData.UserCounts;
      this.EventCounts = CountData.EventCounts;
      this.PanchayatCounts = CountData.PanchayatCounts;
      this.ComplaintCounts = CountData.ComplaintCounts;
    });
  }

  getEventChartData() {
    this.coreServices.getEventGraphlist().subscribe((CountData: any) => {
      this.TotalEvents = parseInt(CountData.TotalEvents);
      this.CompletedEvents = parseInt(CountData.CompletedEvents);
      this.DraftEvents = parseInt(CountData.DraftEvents);
      let perc = this.CompletedEvents / this.TotalEvents * 100;
      // console.log(parseInt(`${perc}`));
      this.chartOptions = {
        series: [parseInt(`${perc}`)],
        chart: {
          height: 350,
          type: "radialBar",
          offsetY: -10
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 135,
            dataLabels: {
              name: {
                fontSize: "16px",
                color: undefined,
                offsetY: 120
              },
              value: {
                offsetY: 76,
                fontSize: "22px",
                color: undefined,
                formatter: function (val: any) {
                  return val + "%";
                }
              }
            }
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            shadeIntensity: 0.15,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 65, 91]
          }
        },
        stroke: {
          dashArray: 4
        },
        labels: ['']
      };
    });
  }

  getUserDropdown() {
    this.coreServices.getStateDDList().subscribe((response: any) => {
      this.states = response;
    });
    
  }

  onStateChange(value: number) {
    console.log(value);
    this.coreServices.getDistrictDDList(value).subscribe((response: any) => {
      console.log(response);
      this.districts = response;
    });
    this.dataSource.data = this.dataSource.data.filter((x: any) => x.StateId == value);
  }

  onDistrictChange(value: number) {
    console.log(value);
    this.coreServices.getBlockDDList(value).subscribe((response: any) => {
      console.log(response);
      this.blocks = response;
    });
    this.dataSource.data = this.dataSource.data.filter((x: any) => x.DistrictId == value);
  }

  onBlockChange(value: number) {
    console.log(value);
    this.coreServices.getPanchayatDDList(value).subscribe((response: any) => {
      console.log(response);
      this.panchayats = response;
    });
    this.dataSource.data = this.dataSource.data.filter((x: any) => x.BlockId == value);
  }

  onPanchayatChange(value: number){
    this.dataSource.data = this.dataSource.data.filter((x: any) => x.PanchayatId == value); 
  }

  getUserList() {
    this.coreServices.getUserList().subscribe((response: any) => {
      this.isloading = false;
      this.dataSource = new MatTableDataSource(response);
      setTimeout(() => {
        this.dataSource.sort = this.sorter3;
        this.dataSource.paginator = this.paginator3;
      })
    });
  }

  getResolvedComplaints() {
    this.coreServices
      .getComplaintList()
      .subscribe((data: any) => {
        this.isloading = false;
        const filteredData = data.filter((d: any) => d.StatusId === 4);
        this.ResolvedDataSource = new MatTableDataSource(filteredData);
        setTimeout(() => {
          this.ResolvedDataSource.sort = this.sorter2;
          this.ResolvedDataSource.paginator = this.paginator2;
        })
      });
  }

  getRecentComplaints() {
    this.coreServices.getComplaintList().subscribe((data: any) => {
      this.isloading = false;
      this.RecentDataSource = new MatTableDataSource(data);
      setTimeout(() => {
        this.RecentDataSource.sort = this.sorter1;
        this.RecentDataSource.paginator = this.paginator1;
      })
    });
  }

  fireFilterEvent(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.applyFilter(input);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  fireFilterEventRecent(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.applyResentFilter(input);
  }

  applyResentFilter(filterValue: string) {
    this.RecentDataSource.filter = filterValue.trim().toLowerCase();
  }

  fireFilterEventResolved(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.applyResolvedFilter(input);
  }

  applyResolvedFilter(filterValue: string) {
    this.ResolvedDataSource.filter = filterValue.trim().toLowerCase();
  }

  openSearch() {
    this.showSearch = true;
  }

  openResolvedSearch() {
    this.showResolvedSearch = true;
  }

  openRecentSearch() {
    this.showRecentSearch = true;
  }

  onSelect(event: any) {
    console.log(event);
  }

  onSave() {
    console.log(this.regionFilter.value);
  }

  onPaginateChange(event: any) {
    this.pageIndex = event.pageIndex;
    localStorage.setItem('', JSON.stringify(this.pageIndex));
  }
}
