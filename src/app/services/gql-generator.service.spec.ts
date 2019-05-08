import { TestBed } from '@angular/core/testing';

import { GqlGeneratorService } from './gql-generator.service';

describe('GqlGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GqlGeneratorService = TestBed.get(GqlGeneratorService);
    expect(service).toBeTruthy();
  });
});
