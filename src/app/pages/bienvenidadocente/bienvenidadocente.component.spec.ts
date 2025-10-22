import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienvenidadocenteComponent } from './bienvenidadocente.component';

describe('BienvenidadocenteComponent', () => {
  let component: BienvenidadocenteComponent;
  let fixture: ComponentFixture<BienvenidadocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BienvenidadocenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BienvenidadocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
