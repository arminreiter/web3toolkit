'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';

export function NetworkFromUrl() {
  const searchParams = useSearchParams();
  const trySetNetwork = useAppStore((s) => s.trySetNetwork);

  useEffect(() => {
    const net = searchParams.get('net');
    if (net) {
      trySetNetwork(net);
    }
  }, [searchParams, trySetNetwork]);

  return null;
}
