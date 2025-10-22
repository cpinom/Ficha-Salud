import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablerodocenteComponent } from './tablerodocente.component';

describe('TablerodocenteComponent', () => {
  let component: TablerodocenteComponent;
  let fixture: ComponentFixture<TablerodocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablerodocenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablerodocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
