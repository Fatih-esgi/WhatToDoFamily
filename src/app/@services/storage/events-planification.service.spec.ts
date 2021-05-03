import { TestBed } from '@angular/core/testing';

import { EventsPlanificationService } from './events-planification.service';

describe('EventsPlanificationService', () => {
  let service: EventsPlanificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventsPlanificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
