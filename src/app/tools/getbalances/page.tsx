'use client';
import { useState } from 'react';
import { Web3Service } from '@/lib/services/web3.service';
import { useAppStore } from '@/lib/store';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

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
    <Card>
      <CardHeader><h5>Get Balance from Addresses</h5></CardHeader>
      <CardContent className="space-y-4">
        <p>Enter public addresses below to get the balance (one address per line)</p>
        <Textarea className="font-code" rows={12} value={addresses} onChange={(e) => setAddresses(e.target.value)} />
        <div>
          <label className="text-sm">Token Contract Address (optional):</label>
          <Input type="text" value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} placeholder="Token contract address (leave empty for native currency)" />
        </div>
        <div>
          <label className="text-sm">Delimiter:</label>
          <Input type="text" value={delimiter} onChange={(e) => setDelimiter(e.target.value)} />
        </div>
        <Button onClick={getBalances}>Get Balances</Button>
        <Textarea className="font-code" rows={12} disabled value={balances} />
      </CardContent>
    </Card>
  );
}
