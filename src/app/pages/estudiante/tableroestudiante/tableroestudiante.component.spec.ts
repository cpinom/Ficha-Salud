import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroestudianteComponent } from './tableroestudiante.component';

describe('TableroestudianteComponent', () => {
  let component: TableroestudianteComponent;
  let fixture: ComponentFixture<TableroestudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableroestudianteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableroestudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
