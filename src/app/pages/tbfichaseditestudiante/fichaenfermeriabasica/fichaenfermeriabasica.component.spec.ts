import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaenfermeriabasicaComponent } from './fichaenfermeriabasica.component';

describe('FichaenfermeriabasicaComponent', () => {
  let component: FichaenfermeriabasicaComponent;
  let fixture: ComponentFixture<FichaenfermeriabasicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FichaenfermeriabasicaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FichaenfermeriabasicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
