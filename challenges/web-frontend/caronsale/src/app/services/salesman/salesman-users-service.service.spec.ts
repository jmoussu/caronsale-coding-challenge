import { TestBed } from '@angular/core/testing';

import { SalesmanUsersServiceService } from './salesman-users-service.service';

describe('SalesmanUsersServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalesmanUsersServiceService = TestBed.get(SalesmanUsersServiceService);
    expect(service).toBeTruthy();
  });
});
