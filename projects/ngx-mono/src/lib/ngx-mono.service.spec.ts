import { TestBed } from '@angular/core/testing';

import { NgxMonoService } from './ngx-mono.service';

describe('NgxMonoService', () => {
  let service: NgxMonoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxMonoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
