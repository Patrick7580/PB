import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionWiseReportComponent } from './region-wise-report.component';

describe('RegionWiseReportComponent', () => {
  let component: RegionWiseReportComponent;
  let fixture: ComponentFixture<RegionWiseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionWiseReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionWiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
