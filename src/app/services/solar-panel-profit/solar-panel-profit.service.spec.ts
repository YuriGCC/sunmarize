import { TestBed } from '@angular/core/testing';
import { SolarPanelProfitService } from './solar-panel-profit.service';

describe('SolarPanelProfitService', () => {
  let service: SolarPanelProfitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolarPanelProfitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
