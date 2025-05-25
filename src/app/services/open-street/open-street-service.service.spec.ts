import { TestBed } from '@angular/core/testing';

import { OpenStreetService } from './open-street-service.service';

describe('OpenStreetService', () => {
  let service: OpenStreetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenStreetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
