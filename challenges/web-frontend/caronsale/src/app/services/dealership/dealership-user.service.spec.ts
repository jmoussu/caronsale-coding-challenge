import { TestBed } from '@angular/core/testing';

import { DealershipUserService } from './dealership-user.service';

describe('DealershipUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DealershipUserService = TestBed.get(DealershipUserService);
    expect(service).toBeTruthy();
  });
});
