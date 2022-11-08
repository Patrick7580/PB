import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPanchayatComponent } from './add-panchayat.component';

describe('AddPanchayatComponent', () => {
  let component: AddPanchayatComponent;
  let fixture: ComponentFixture<AddPanchayatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPanchayatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPanchayatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
