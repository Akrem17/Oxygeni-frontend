import { TestBed } from '@angular/core/testing';

import { OxygenService } from './oxygen.service';

describe('OxygenService', () => {
  let service: OxygenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OxygenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
