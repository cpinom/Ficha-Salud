import { TestBed } from '@angular/core/testing';

import { DarkmodeservicesService } from './darkmodeservices.service';

describe('DarkmodeservicesService', () => {
  let service: DarkmodeservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DarkmodeservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
