'use client';

import { useState } from 'react';
import { Web3Service } from '@/lib/services/web3.service';
import { useAppStore } from '@/lib/store';
import { ToolCard, FormField, OutputDisplay, LoadingButton } from '@/components/tools';

export default function GetBalancesPage() {
  const network = useAppStore((s) => s.network);
  const [addresses, setAddresses] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [delimiter, setDelimiter] = useState(', ');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const getBalances = async () => {
    setLoading(true);
    setOutput('');
    let result = '';
    try {
      for await (const balance of Web3Service.getBalancesAsync(
        addresses,
        network.rpcUrl,
        delimiter,
        tokenAddress || undefined
      )) {
        result += balance;
        setOutput(result);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolCard title="Get Balances" description="Query balances for one or more public addresses (one per line).">
      <FormField label="Addresses" multiline value={addresses} onChange={setAddresses} placeholder="Enter addresses (one per line)..." rows={12} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Token Contract Address (optional)" value={tokenAddress} onChange={setTokenAddress} placeholder="Leave empty for native currency" />
        <FormField label="Delimiter" value={delimiter} onChange={setDelimiter} />
      </div>
      <LoadingButton loading={loading} loadingText="Fetching..." onClick={getBalances}>Get Balances</LoadingButton>
      <OutputDisplay value={output} rows={12} placeholder="Balances will appear here..." />
    </ToolCard>
  );
}
