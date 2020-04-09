import { TestBed } from '@angular/core/testing';

import { UIManagerService } from './ui-manager.service';

describe('UIManagerService', () => {
  let service: UIManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UIManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
