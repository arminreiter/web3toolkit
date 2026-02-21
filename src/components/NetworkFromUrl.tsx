'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useAppStore, SELECTED_NETWORK_KEY } from '@/lib/store';

export function NetworkFromUrl() {
  const searchParams = useSearchParams();
  const trySetNetwork = useAppStore((s) => s.trySetNetwork);

  useEffect(() => {
    const net = searchParams.get('net');
    if (net) {
      trySetNetwork(net);
    } else {
      const saved = localStorage.getItem(SELECTED_NETWORK_KEY);
      if (saved) {
        trySetNetwork(saved);
      }
    }
  }, [searchParams, trySetNetwork]);

  return null;
}
