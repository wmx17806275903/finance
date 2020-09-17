import { TestBed } from '@angular/core/testing';

import { HttpDomainService } from './http-domain.service';

describe('HttpDomainService', () => {
  let service: HttpDomainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpDomainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
