import { TestBed } from '@angular/core/testing';
import { ChartBuildService } from '../chart-build/chart-build-service.service';

describe('ChartBuildService', () => {
  let service: ChartBuildService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartBuildService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
