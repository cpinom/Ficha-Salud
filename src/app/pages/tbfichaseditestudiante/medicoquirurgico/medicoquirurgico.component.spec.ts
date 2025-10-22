import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoquirurgicoComponent } from './medicoquirurgico.component';

describe('MedicoquirurgicoComponent', () => {
  let component: MedicoquirurgicoComponent;
  let fixture: ComponentFixture<MedicoquirurgicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicoquirurgicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedicoquirurgicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
