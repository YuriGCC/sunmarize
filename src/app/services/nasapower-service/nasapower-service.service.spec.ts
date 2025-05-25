import { TestBed } from '@angular/core/testing';
import { NasapowerService } from './nasapower-service.service';

describe('NasapowerServiceService', () => {
  let service: NasapowerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NasapowerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
