import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSymptomsComponent } from './select-symptoms.component';

describe('SelectSymptomsComponent', () => {
  let component: SelectSymptomsComponent;
  let fixture: ComponentFixture<SelectSymptomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectSymptomsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectSymptomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
