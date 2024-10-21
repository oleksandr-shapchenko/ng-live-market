import { TestBed } from '@angular/core/testing';

import { FintachartsWsService } from './fintacharts-ws.service';

describe('FintachartsWsService', () => {
  let service: FintachartsWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FintachartsWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
