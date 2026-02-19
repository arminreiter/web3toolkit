import { describe, it, expect } from 'vitest';
import { Web3Service } from './web3.service';

// A known valid seed phrase for testing (NOT for production use)
const TEST_SEED = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';

describe('Web3Service.getPath', () => {
  it('should return updated derivation path for given index', () => {
    const result = Web3Service.getPath(5, "m/44'/60'/0'/0/0");
    expect(result).toBe("m/44'/60'/0'/0/5");
  });

  it('should handle index 0', () => {
    const result = Web3Service.getPath(0, "m/44'/60'/0'/0/0");
    expect(result).toBe("m/44'/60'/0'/0/0");
  });

  it('should handle large indices', () => {
    const result = Web3Service.getPath(99, "m/44'/60'/0'/0/0");
    expect(result).toBe("m/44'/60'/0'/0/99");
  });
});

describe('Web3Service.isValidAddress', () => {
  it('should return true for valid address', () => {
    expect(Web3Service.isValidAddress('0x0000000000000000000000000000000000000000')).toBe(true);
  });

  it('should return false for invalid address', () => {
    expect(Web3Service.isValidAddress('invalid')).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(Web3Service.isValidAddress('')).toBe(false);
  });
});

describe('Web3Service.isValidSeedPhrase', () => {
  it('should return VALID for a valid seed phrase', () => {
    const result = Web3Service.isValidSeedPhrase(TEST_SEED);
    expect(result).toBe('VALID');
  });

  it('should return INVALID for an invalid seed phrase', () => {
    const result = Web3Service.isValidSeedPhrase('invalid seed phrase words here');
    expect(result).toContain('INVALID');
  });

  it('should return INVALID for wrong word count', () => {
    const result = Web3Service.isValidSeedPhrase('abandon abandon');
    expect(result).toContain('INVALID');
  });
});

describe('Web3Service.getAddresses', () => {
  it('should derive addresses from a seed phrase', () => {
    const addresses = Web3Service.getAddresses(TEST_SEED, 3);
    const lines = addresses.split('\n');
    expect(lines.length).toBe(3);
    lines.forEach((addr) => {
      expect(addr.startsWith('0x')).toBe(true);
      expect(addr.length).toBe(42);
    });
  });

  it('should return consistent addresses', () => {
    const addresses1 = Web3Service.getAddresses(TEST_SEED, 2);
    const addresses2 = Web3Service.getAddresses(TEST_SEED, 2);
    expect(addresses1).toBe(addresses2);
  });
});

describe('Web3Service.getPrivateKeys', () => {
  it('should derive private keys from a seed phrase', () => {
    const keys = Web3Service.getPrivateKeys(TEST_SEED, 3);
    expect(keys.length).toBe(3);
    keys.forEach((key) => {
      expect(key.startsWith('0x')).toBe(true);
    });
  });
});

describe('Web3Service.getAddressFromPrivateKey', () => {
  it('should derive address from private key', () => {
    const keys = Web3Service.getPrivateKeys(TEST_SEED, 1);
    const address = Web3Service.getAddressFromPrivateKey(keys[0]);
    expect(address.startsWith('0x')).toBe(true);
    expect(address.length).toBe(42);
  });
});

describe('Web3Service.getAddressFromPrivateKeys', () => {
  it('should derive addresses from multiple private keys', () => {
    const keys = Web3Service.getPrivateKeys(TEST_SEED, 3);
    const addresses = Web3Service.getAddressFromPrivateKeys(keys);
    expect(addresses.length).toBe(3);
    addresses.forEach((addr) => {
      expect(addr.startsWith('0x')).toBe(true);
    });
  });

  it('should skip empty lines', () => {
    const keys = Web3Service.getPrivateKeys(TEST_SEED, 1);
    const addresses = Web3Service.getAddressFromPrivateKeys([...keys, '', '  ']);
    expect(addresses.length).toBe(1);
  });
});
