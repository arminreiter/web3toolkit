'use client';

import { useEffect } from 'react';
import '@/lib/polyfills';

export function BigIntPolyfill() {
  useEffect(() => {
    // Needed for JSON serialization of BigInt values from web3
    if (!(BigInt.prototype as any).toJSON) {
      (BigInt.prototype as any).toJSON = function () {
        return this.toString();
      };
    }
  }, []);
  return null;
}
