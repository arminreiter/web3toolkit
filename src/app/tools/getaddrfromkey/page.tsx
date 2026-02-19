'use client';
import { useState } from 'react';
import { Web3Service } from '@/lib/services/web3.service';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function GetAddrFromKeyPage() {
  const [privateKeys, setPrivateKeys] = useState('');
  const [genAddresses, setGenAddresses] = useState('');

  const getAddresses = () => {
    try {
      const addresses = Web3Service.getAddressFromPrivateKeys(privateKeys.split('\n'));
      setGenAddresses(addresses.join('\n'));
    } catch (error) {
      setGenAddresses(String(error));
    }
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardContent className="pt-6 space-y-5">
        <div>
          <h3 className="text-lg font-semibold mb-1">Get Addresses from Key</h3>
          <p className="text-sm text-muted-foreground">Enter private keys to derive their public addresses.</p>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Private keys (one per line)</Label>
          <Textarea className="font-code" rows={2} value={privateKeys} onChange={(e) => setPrivateKeys(e.target.value)} placeholder="Enter private keys..." />
        </div>
        <Button onClick={getAddresses}>Get Address(es)</Button>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Output</Label>
          <Textarea className="font-code" rows={20} disabled value={genAddresses} placeholder="Public addresses will appear here..." />
        </div>
      </CardContent>
    </Card>
  );
}
