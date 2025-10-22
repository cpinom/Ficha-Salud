import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbfichasasignadasComponent } from './tbfichasasignadas.component';

describe('TbfichasasignadasComponent', () => {
  let component: TbfichasasignadasComponent;
  let fixture: ComponentFixture<TbfichasasignadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TbfichasasignadasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TbfichasasignadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
