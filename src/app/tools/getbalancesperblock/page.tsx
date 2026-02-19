'use client';

import { useState } from 'react';
import { Web3Service } from '@/lib/services/web3.service';
import { useAppStore } from '@/lib/store';
import { ToolCard, FormField, OutputDisplay, LoadingButton } from '@/components/tools';

export default function GetBalancesPerBlockPage() {
  const network = useAppStore((s) => s.network);
  const [address, setAddress] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [delimiter, setDelimiter] = useState(', ');
  const [startBlock, setStartBlock] = useState(0);
  const [endBlock, setEndBlock] = useState(0);
  const [iteration, setIteration] = useState(17280);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const getBalances = async () => {
    setLoading(true);
    let actualEndBlock = BigInt(endBlock);
    if (actualEndBlock === BigInt(0)) {
      actualEndBlock = await Web3Service.getLastBlockNumber(network);
      setEndBlock(Number(actualEndBlock));
    }

    setOutput('');
    let result = '';
    try {
      for await (const balance of Web3Service.getBalancesPerBlockAsync(
        address,
        network.rpcUrl,
        delimiter,
        BigInt(startBlock),
        actualEndBlock,
        iteration,
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
    <ToolCard title="Balances Per Block" description="Query balance history for a single address across block ranges.">
      <FormField label="Address" value={address} onChange={setAddress} placeholder="Address to check" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Token Contract Address (optional)" value={tokenAddress} onChange={setTokenAddress} placeholder="Leave empty for native currency" />
        <FormField label="Delimiter" value={delimiter} onChange={setDelimiter} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FormField label="Start Block" type="number" value={startBlock} onChange={(v) => setStartBlock(Number(v))} min={1} />
        <FormField label="End Block" type="number" value={endBlock} onChange={(v) => setEndBlock(Number(v))} min={1} />
        <FormField label="Iteration" type="number" value={iteration} onChange={(v) => setIteration(Number(v))} min={1} />
      </div>
      <LoadingButton loading={loading} loadingText="Fetching..." onClick={getBalances}>Get Balances</LoadingButton>
      <OutputDisplay value={output} rows={12} placeholder="Balance history will appear here..." />
    </ToolCard>
  );
}
