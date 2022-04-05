/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FolderManagerService } from './folder-manager.service';

describe('Service: FolderManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FolderManagerService]
    });
  });

  it('should ...', inject([FolderManagerService], (service: FolderManagerService) => {
    expect(service).toBeTruthy();
  }));
});
