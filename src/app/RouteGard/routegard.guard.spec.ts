import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { routegardGuard } from './routegard.guard';

describe('routegardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => routegardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
