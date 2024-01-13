import { TestBed } from '@angular/core/testing';

import { MainUIService } from './main-ui.service';

describe('MainUIService', () => {
  let service: MainUIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainUIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
