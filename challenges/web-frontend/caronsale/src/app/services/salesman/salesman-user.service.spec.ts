import { TestBed } from '@angular/core/testing';

import { SalesmanUserService } from './salesman-user.service';

describe('SalesmanUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalesmanUserService = TestBed.get(SalesmanUserService);
    expect(service).toBeTruthy();
  });
});
