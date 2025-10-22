import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaluddigitalComponent } from './saluddigital.component';

describe('SaluddigitalComponent', () => {
  let component: SaluddigitalComponent;
  let fixture: ComponentFixture<SaluddigitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaluddigitalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaluddigitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
