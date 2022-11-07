import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanchayatDetailsComponent } from './panchayat-details.component';

describe('PanchayatDetailsComponent', () => {
  let component: PanchayatDetailsComponent;
  let fixture: ComponentFixture<PanchayatDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanchayatDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanchayatDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
