import { TestBed } from '@angular/core/testing';

import { AssetsStateService } from './assets-state.service';

describe('AssetsStateService', () => {
  let service: AssetsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetsStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
