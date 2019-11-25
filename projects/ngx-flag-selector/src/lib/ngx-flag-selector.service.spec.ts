import { TestBed } from '@angular/core/testing';

import { NgxFlagSelectorService } from './ngx-flag-selector.service';

describe('NgxFlagSelectorService', () => {
  let service: NgxFlagSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxFlagSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
