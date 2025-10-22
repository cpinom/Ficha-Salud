import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticaprofesionalComponent } from './practicaprofesional.component';

describe('PracticaprofesionalComponent', () => {
  let component: PracticaprofesionalComponent;
  let fixture: ComponentFixture<PracticaprofesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PracticaprofesionalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PracticaprofesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
