import { TestBed } from '@angular/core/testing';

import { CheckdeviceService } from './checkdevice.service';

describe('CheckdeviceService', () => {
  let service: CheckdeviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckdeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
