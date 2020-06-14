import { TestBed } from '@angular/core/testing';

import { SentryErrorService } from './sentry-error.service';

describe('SentryErrorHandlerService', () => {
  let service: SentryErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SentryErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
