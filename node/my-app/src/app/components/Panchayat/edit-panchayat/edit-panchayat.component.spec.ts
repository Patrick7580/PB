import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPanchayatComponent } from './edit-panchayat.component';

describe('EditPanchayatComponent', () => {
  let component: EditPanchayatComponent;
  let fixture: ComponentFixture<EditPanchayatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPanchayatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPanchayatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
