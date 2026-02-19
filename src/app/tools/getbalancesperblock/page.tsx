'use client';
import { useState } from 'react';
import { Web3Service } from '@/lib/services/web3.service';
import { useAppStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

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
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardContent className="pt-6 space-y-5">
        <div>
          <h3 className="text-lg font-semibold mb-1">Balances Per Block</h3>
          <p className="text-sm text-muted-foreground">Query balance history for a single address across block ranges.</p>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Address</Label>
          <Input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address to check" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Token Contract Address (optional)</Label>
            <Input type="text" value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} placeholder="Leave empty for native currency" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Delimiter</Label>
            <Input type="text" value={delimiter} onChange={(e) => setDelimiter(e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Start Block</Label>
            <Input type="number" min={1} value={startBlock} onChange={(e) => setStartBlock(Number(e.target.value))} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">End Block</Label>
            <Input type="number" min={1} value={endBlock} onChange={(e) => setEndBlock(Number(e.target.value))} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Iteration</Label>
            <Input type="number" min={1} value={iteration} onChange={(e) => setIteration(Number(e.target.value))} />
          </div>
        </div>
        <Button onClick={getBalances}>Get Balances</Button>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Output</Label>
          <Textarea className="font-code" rows={12} disabled value={balances} placeholder="Balance history will appear here..." />
        </div>
      </CardContent>
    </Card>
  );
}
