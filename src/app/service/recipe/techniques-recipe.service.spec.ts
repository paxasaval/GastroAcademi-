import { TestBed } from '@angular/core/testing';

import { TechniquesRecipeService } from './techniques-recipe.service';

describe('TechniquesRecipeService', () => {
  let service: TechniquesRecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechniquesRecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
