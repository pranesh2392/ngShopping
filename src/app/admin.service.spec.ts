import { TestBed, inject } from '@angular/core/testing';

import { AdminAuth } from './admin.service';

describe('AdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminAuth]
    });
  });

  it('should be created', inject([AdminAuth], (service: AdminAuth) => {
    expect(service).toBeTruthy();
  }));
});
