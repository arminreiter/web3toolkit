import { TestBed } from '@angular/core/testing';
import { Web3Service } from './web3.service';

describe('Web3Service.getPath', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should return updated derivation path for given index', () => {
    const result = Web3Service.getPath(5, "m/44'/60'/0'/0/0");
    expect(result).toBe("m/44'/60'/0'/0/5");
  });
});
