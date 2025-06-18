import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetdoctorComponent } from './getdoctor.component';

describe('GetdoctorComponent', () => {
  let component: GetdoctorComponent;
  let fixture: ComponentFixture<GetdoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetdoctorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetdoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
