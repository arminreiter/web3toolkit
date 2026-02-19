'use client';
import { useState } from 'react';
import { Web3Service } from '@/lib/services/web3.service';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

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
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardContent className="pt-6 space-y-5">
        <div>
          <h3 className="text-lg font-semibold mb-1">Validate Addresses</h3>
          <p className="text-sm text-muted-foreground">Check whether addresses are valid blockchain addresses.</p>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Public addresses (one per line)</Label>
          <Textarea className="font-code" rows={5} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter addresses to validate..." />
        </div>
        <Button onClick={isValidAddress}>Check</Button>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Output</Label>
          <Textarea className="font-code" rows={20} disabled value={result} placeholder="Validation results will appear here..." />
        </div>
      </CardContent>
    </Card>
  );
}
