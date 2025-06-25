import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorLandingComponent } from './doctor-landing.component';

describe('DoctorLandingComponent', () => {
  let component: DoctorLandingComponent;
  let fixture: ComponentFixture<DoctorLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorLandingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
