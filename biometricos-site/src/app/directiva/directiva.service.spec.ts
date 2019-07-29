import { TestBed, inject } from '@angular/core/testing';

import { DirectivaService } from './directiva.service';

describe('DirectivaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DirectivaService]
    });
  });

  it('should be created', inject([DirectivaService], (service: DirectivaService) => {
    expect(service).toBeTruthy();
  }));
});
