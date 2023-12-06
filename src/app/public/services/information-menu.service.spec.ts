import { TestBed } from '@angular/core/testing';

import { InformationMenuService } from './information-menu.service';

describe('InformationMenuService', () => {
  let service: InformationMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformationMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
