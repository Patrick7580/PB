import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { ApexNonAxisChartSeries, ApexPlotOptions, ApexChart, ApexFill, ChartComponent, ApexStroke } from "ng-apexcharts";
import { ComplaintList } from 'src/app/models/complaint-list';
import { UserList } from 'src/app/models/user-list';
import { CoreService } from 'src/app/services/core.service';
import { NgxSpinnerService } from "ngx-spinner";
import { DatePipe } from '@angular/common';
import { timeParse } from 'd3';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};

interface Date {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-status-wise-report',
  templateUrl: './status-wise-report.component.html',
  styleUrls: ['./status-wise-report.component.css']
})

export class StatusWiseReportComponent implements OnInit {
  UserList: any = [];
  isloading: boolean = true;
  DraftEvents: any;
  CompletedEvents: any;
  TotalEvents: any;
  radialPerc: any;

  Data = new FormControl();

  dates: Date[] = [
    { value: '0', viewValue: 'Today' },
    { value: '1', viewValue: 'Yesterday' },
    { value: '2', viewValue: 'Last 7 Days' },
    { value: '3', viewValue: 'Last 30 Days' },
    { value: '4', viewValue: 'This Month' },
    { value: '5', viewValue: 'Last Month' },
  ];

  onChange(value: number) {
    console.log(value);
    let today = new Date().toISOString();
    // const yesterdayDate = new Date();  // Gives today's date
    // const todaysDayOfMonth = today.getDate();  // Gives day of the month
    // yesterdayDate.setDate(todaysDayOfMonth - 1);  // Gives yesterday's date

    const last7Date = new Date();
    // last7Date.setDate(todaysDayOfMonth - 7);

    let previousMonth = new Date()
    // let today: Date = new Date();
    let pipe = new DatePipe('en-US');
    let todayWithPipe : any = '';
    todayWithPipe = new Date().toISOString();
    //todayWithPipe = pipe.transform(Date.now(), 'dd-MM-yyyy');

    if (value == 0) {
      console.log(value == 0, todayWithPipe, "todayWithPipe");
      // let today = new Date();
      this.RecentDataSource.data = this.RecentDataSource.data.filter((x: any) =>  new Date(x.CreatedDate) === todayWithPipe);
    }
    // else if (value == 1) {
    //   console.log(value == 1, yesterdayDate, "Yester");
    //   this.RecentDataSource.data = this.RecentDataSource.data.filter((x: any) => x.CreatedDate <= yesterdayDate);
    // }
    // else if (value == 2) {
    //   console.log(value == 2,last7Date, "Last 7 Days");
    //   this.RecentDataSource.data = this.RecentDataSource.data.filter((x: any) => x.CreatedDate >= last7Date );
    // }
  }

  @ViewChild('MatPaginator1') paginator1: any = MatPaginator;
  @ViewChild('MatPaginator2') paginator2: any = MatPaginator;
  @ViewChild('MatPaginator3') paginator3: any = MatPaginator;
  @ViewChild('sorter1') sorter1!: MatSort;
  @ViewChild('sorter2') sorter2!: MatSort;
  @ViewChild('sorter3') sorter3!: MatSort;
  @ViewChild("chart") chart: ChartComponent | any;
  
  public chartOptions !: Partial<ChartOptions> | any;

  Label: any[] = [];
  public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [350, 450, 100] },
      // { data: [ 50, 150, 120 ] },
      // { data: [ 250, 130, 70 ] }
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
  // ---------------------------------------MUlti line---------------------

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public lineChartLabels = ['Jan', 'Feb', 'Mar', 'April', 'May', 'Jun', 'july', 'Aug', 'Sep'];
  // public lineChartType = 'line';
  public lineChartType: ChartType = 'line';
  public lineChartLegend = true;
  public lineChartData = [
    { data: [22, 49, 89, 31, 86, 35, 50, 10, 5,], label: 'New' },
    { data: [38, 38, 65, 39, 66, 17, 80, 20, 15], label: 'In-process' },
    { data: [15, 49, 89, 31, 86, 35, 50, 10, 5], label: 'On-Hold' },
    { data: [20, 38, 65, 39, 66, 17, 80, 2, 25], label: 'Completed' }
  ];
  // ---------------------------Form /Tables -------------------------------------
  selectedFW = new FormControl();
  frameworks: string[] = ['Madhya Pradesh', 'Uttar Pradesh', 'Maharastra'];
  showSearch: boolean = false;
  showResolvedSearch: boolean = false;
  showRecentSearch: boolean = false;
  ComplaintList: any = [];
  pageIndex = 0;

  displayedColumnRecent: string[] = [
    'Title',
    'ComplaintUserId',
    'CreatedDate',
    'AssignUserId',
    'StatusId',
  ];

  displayedColumnsResolved: string[] = [
    'Title',
    'ComplaintUserId',
    'CreatedDate',
    'AssignUserId',
    'StatusId',
  ];

  displayedColumnsUser: string[] = [
    'ProfileImage',
    'FirstName',
    'Phone',
    'RoleId',
    'PanchayatId',
    'WardId',
  ];

  RecentDataSource = new MatTableDataSource<ComplaintList[]>(this.ComplaintList);
  ResolvedDataSource = new MatTableDataSource<ComplaintList[]>(this.ComplaintList);
  dataSource = new MatTableDataSource<UserList[]>(this.UserList);

  constructor(private coreServices: CoreService, private SpinnerService: NgxSpinnerService) {
    this.getEventChartData();
    this.getDates();
  }

  getDates() {

  }

  ngOnInit(): void {
    this.isloading = true;
    this.SpinnerService.show();
    setTimeout(() => {
      this.SpinnerService.hide();
      this.getUserList();
      this.getRecentComplaints();
      this.getResolvedComplaints();
    }, 500)
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

  getUserList() {
    this.coreServices.getUserList().subscribe((response: any) => {
      this.isloading = false;
      this.dataSource = new MatTableDataSource(response);
      // console.log(this.dataSource);       
      setTimeout(() => {
        this.dataSource.sort = this.sorter3;
        this.dataSource.paginator = this.paginator3;
      })
    });
  }

  getResolvedComplaints() {
    this.coreServices.getComplaintList().subscribe((response: any) => {
      this.isloading = false;
      const filteredData = response.filter((d: any) => d.StatusId === 4);
      this.ResolvedDataSource = new MatTableDataSource(filteredData);
      console.log(filteredData);
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

  onPaginateChange(event: any) {
    this.pageIndex = event.pageIndex;
    localStorage.setItem('', JSON.stringify(this.pageIndex));
  }

  openSearch() {
    this.showSearch = true;
  }

  onSelect(event: any) {
    console.log(event);
  }

  openResolvedSearch() {
    this.showResolvedSearch = true;
  }

  openRecentSearch() {
    this.showRecentSearch = true;
  }
}
