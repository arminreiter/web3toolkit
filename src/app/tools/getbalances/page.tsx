'use client';
import { useState } from 'react';
import { Web3Service } from '@/lib/services/web3.service';
import { useAppStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function GetBalancesPage() {
  const network = useAppStore((s) => s.network);
  const [addresses, setAddresses] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [delimiter, setDelimiter] = useState(', ');
  const [balances, setBalances] = useState('');

  const getBalances = async () => {
    setBalances('');
    let result = '';
    for await (const balance of Web3Service.getBalancesAsync(
      addresses,
      network.rpcUrl,
      delimiter,
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
          <h3 className="text-lg font-semibold mb-1">Get Balances</h3>
          <p className="text-sm text-muted-foreground">Query balances for one or more public addresses (one per line).</p>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Addresses</Label>
          <Textarea className="font-code" rows={12} value={addresses} onChange={(e) => setAddresses(e.target.value)} placeholder="Enter addresses (one per line)..." />
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
        <Button onClick={getBalances}>Get Balances</Button>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Output</Label>
          <Textarea className="font-code" rows={12} disabled value={balances} placeholder="Balances will appear here..." />
        </div>
      </CardContent>
    </Card>
  );
}
