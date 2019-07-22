import { TestBed, inject } from '@angular/core/testing';

import { AltaService } from './alta.service';

describe('AltaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AltaService]
    });
  });

  it('should be created', inject([AltaService], (service: AltaService) => {
    expect(service).toBeTruthy();
  }));
});
