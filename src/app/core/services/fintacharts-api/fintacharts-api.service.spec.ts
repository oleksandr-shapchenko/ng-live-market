import { TestBed } from '@angular/core/testing';

import { FintachartsApiService } from './fintacharts-api.service';

describe('FintachartsApiService', () => {
  let service: FintachartsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FintachartsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
