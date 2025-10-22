import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListacursoseccionComponent } from './listacursoseccion.component';

describe('ListacursoseccionComponent', () => {
  let component: ListacursoseccionComponent;
  let fixture: ComponentFixture<ListacursoseccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListacursoseccionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListacursoseccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
