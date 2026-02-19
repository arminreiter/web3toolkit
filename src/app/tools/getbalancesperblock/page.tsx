'use client';
import { useState } from 'react';
import { Web3Service } from '@/lib/services/web3.service';
import { useAppStore } from '@/lib/store';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function GetBalancesPerBlockPage() {
  const network = useAppStore((s) => s.network);
  const [address, setAddress] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [delimiter, setDelimiter] = useState(', ');
  const [startBlock, setStartBlock] = useState(0);
  const [endBlock, setEndBlock] = useState(0);
  const [iteration, setIteration] = useState(17280);
  const [balances, setBalances] = useState('');

  const getBalances = async () => {
    let actualEndBlock = BigInt(endBlock);
    if (actualEndBlock === BigInt(0)) {
      actualEndBlock = await Web3Service.getLastBlockNumber(network);
      setEndBlock(Number(actualEndBlock));
    }

    setBalances('');
    let result = '';
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
      setBalances(result);
    }
  };

  return (
    <Card>
      <CardHeader><h5>Get Balances from Address per Block</h5></CardHeader>
      <CardContent className="space-y-4">
        <p>Enter public address below to get the balance (one address)</p>
        <Input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address to check" />
        <div>
          <label className="text-sm">Token Contract Address (optional):</label>
          <Input type="text" value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} placeholder="Token contract address (leave empty for native currency)" />
        </div>
        <div>
          <label className="text-sm">Delimiter:</label>
          <Input type="text" value={delimiter} onChange={(e) => setDelimiter(e.target.value)} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm">Start Block:</label>
            <Input type="number" min={1} value={startBlock} onChange={(e) => setStartBlock(Number(e.target.value))} />
          </div>
          <div>
            <label className="text-sm">End Block:</label>
            <Input type="number" min={1} value={endBlock} onChange={(e) => setEndBlock(Number(e.target.value))} />
          </div>
          <div>
            <label className="text-sm">Iteration:</label>
            <Input type="number" min={1} value={iteration} onChange={(e) => setIteration(Number(e.target.value))} />
          </div>
        </div>
        <Button onClick={getBalances}>Get Balances</Button>
        <Textarea className="font-code" rows={12} disabled value={balances} />
      </CardContent>
    </Card>
  );
}
