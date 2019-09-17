import { TestBed } from '@angular/core/testing';

import { FestasService } from './festas.service';

describe('FestasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FestasService = TestBed.get(FestasService);
    expect(service).toBeTruthy();
  });
});
