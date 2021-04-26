import { TestBed } from '@angular/core/testing';

import { IosInstallToastService } from './ios-install-toast.service';

describe('IosInstallToastService', () => {
  let service: IosInstallToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IosInstallToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
