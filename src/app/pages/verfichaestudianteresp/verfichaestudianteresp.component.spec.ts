import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerfichaestudianterespComponent } from './verfichaestudianteresp.component';

describe('VerfichaestudianterespComponent', () => {
  let component: VerfichaestudianterespComponent;
  let fixture: ComponentFixture<VerfichaestudianterespComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerfichaestudianterespComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerfichaestudianterespComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
