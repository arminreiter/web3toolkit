'use client';
import { useState } from 'react';
import { Web3Service } from '@/lib/services/web3.service';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function IsValidAddressPage() {
  const [address, setAddress] = useState('');
  const [result, setResult] = useState('');

  const isValidAddress = () => {
    let output = '';
    const addresses = address.split('\n');
    addresses.forEach((add) => {
      if (add.length > 0) {
        const valid = Web3Service.isValidAddress(add);
        output += add + ': ' + valid + '\n';
      }
    });
    setResult(output);
  };

  return (
    <Card>
      <CardHeader><h5>Check if the addresses are valid blockchain addresses</h5></CardHeader>
      <CardContent className="space-y-4">
        <p>Enter public addresses:</p>
        <Textarea className="font-code" rows={5} value={address} onChange={(e) => setAddress(e.target.value)} />
        <Button onClick={isValidAddress}>Check</Button>
        <Textarea className="font-code" rows={20} disabled value={result} />
      </CardContent>
    </Card>
  );
}
