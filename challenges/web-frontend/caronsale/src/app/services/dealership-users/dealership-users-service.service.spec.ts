import { TestBed } from '@angular/core/testing';

import { DealershipUsersServiceService } from './dealership-users-service.service';

describe('DealershipUsersServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DealershipUsersServiceService = TestBed.get(DealershipUsersServiceService);
    expect(service).toBeTruthy();
  });
});
