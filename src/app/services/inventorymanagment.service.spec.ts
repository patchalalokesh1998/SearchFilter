import { TestBed } from '@angular/core/testing';

import { InventorymanagmentService } from './inventorymanagment.service';

describe('InventorymanagmentService', () => {
  let service: InventorymanagmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventorymanagmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
