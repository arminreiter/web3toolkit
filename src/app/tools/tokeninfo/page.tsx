'use client';

import { useState } from 'react';
import { Web3Service } from '@/lib/services/web3.service';
import { useAppStore } from '@/lib/store';
import { ToolCard, FormField, LoadingButton } from '@/components/tools';
import { Label } from '@/components/ui/label';

interface TokenInfo {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
}

export default function TokenInfoPage() {
  const network = useAppStore((s) => s.network);
  const [tokenAddress, setTokenAddress] = useState('');
  const [info, setInfo] = useState<TokenInfo | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getTokenInfo = async () => {
    setLoading(true);
    setInfo(null);
    setError('');
    try {
      const result = await Web3Service.getTokenInfo(tokenAddress.trim(), network);
      setInfo(result);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolCard title="ERC-20 Token Info" description="Look up name, symbol, decimals, and total supply for any ERC-20 token contract.">
      <FormField label="Token Contract Address" value={tokenAddress} onChange={setTokenAddress} placeholder="0x..." />
      <LoadingButton loading={loading} loadingText="Fetching..." onClick={getTokenInfo}>Get Token Info</LoadingButton>

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {info && (
        <div className="rounded-lg border border-border/50 bg-secondary/30 divide-y divide-border/40">
          {([
            ['Name', info.name],
            ['Symbol', info.symbol],
            ['Decimals', String(info.decimals)],
            ['Total Supply', `${info.totalSupply} ${info.symbol}`],
          ] as const).map(([label, value]) => (
            <div key={label} className="flex items-center justify-between px-5 py-3.5">
              <Label className="text-sm text-muted-foreground">{label}</Label>
              <span className="font-code text-sm text-foreground">{value}</span>
            </div>
          ))}
        </div>
      )}
    </ToolCard>
  );
}
