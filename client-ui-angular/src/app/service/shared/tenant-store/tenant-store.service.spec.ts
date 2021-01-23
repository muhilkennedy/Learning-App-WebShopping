import { TestBed } from '@angular/core/testing';

import { TenantStoreService } from './tenant-store.service';

describe('TenantStoreService', () => {
  let service: TenantStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TenantStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
