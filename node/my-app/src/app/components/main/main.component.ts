import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  panelOpenState = false;
  panelOpenState1 = false;
  panelOpenState2 = false;
  panelOpenState3 = false;
  panelOpenState4 = false;
  panelOpenState5 = false;
  panelOpenState6 = false;
  panelOpenState7 = false;
  panelOpenState8 = false;
  panelOpenState9 = false;

  lang: any = [];
  count: any;
  selectedRowIndex: any;

  constructor(private coreServices: CoreService) { }

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'en';
    this.getNotify();
  }

  changelang(lang: string) {
    localStorage.setItem('lang', lang);
    window.location.reload();
  }

  highlight(row: { id: any; }) {
    this.selectedRowIndex = row.id;
  }

  getNotify() {
    this.coreServices.getNotificationList().subscribe((response: any) => {
      let data = response;
      this.count = data.filter((res: any) => res.Seen === false).length;
      // console.log(this.count);
    })
  }
}