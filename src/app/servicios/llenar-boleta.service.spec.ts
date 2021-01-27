import { TestBed } from '@angular/core/testing';

import { LlenarBoletaService } from './llenar-boleta.service';

describe('LlenarBoletaService', () => {
  let service: LlenarBoletaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LlenarBoletaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
