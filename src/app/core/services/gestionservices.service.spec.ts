import { TestBed } from '@angular/core/testing';

import { GestionservicesService } from './gestionservices.service';

describe('GestionservicesService', () => {
  let service: GestionservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
