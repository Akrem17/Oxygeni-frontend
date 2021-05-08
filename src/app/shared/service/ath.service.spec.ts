import { TestBed } from '@angular/core/testing';

import { AthService } from './ath.service';

describe('AthService', () => {
  let service: AthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
