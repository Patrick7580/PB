import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusWiseReportComponent } from './status-wise-report.component';

describe('StatusWiseReportComponent', () => {
  let component: StatusWiseReportComponent;
  let fixture: ComponentFixture<StatusWiseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusWiseReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusWiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
