import { TestBed } from '@angular/core/testing';

import { TechniquesService } from './techniques.service';

describe('TechniquesService', () => {
  let service: TechniquesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechniquesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
