'use client';
import { useState } from 'react';
import { Web3Service } from '@/lib/services/web3.service';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

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
    <Card>
      <CardHeader><h5>Get public addresses from private key</h5></CardHeader>
      <CardContent className="space-y-4">
        <p>Enter private keys and get the public address.</p>
        <Textarea className="font-code" rows={2} value={privateKeys} onChange={(e) => setPrivateKeys(e.target.value)} />
        <Button onClick={getAddresses}>Get Address(es)</Button>
        <Textarea className="font-code" rows={20} disabled value={genAddresses} />
      </CardContent>
    </Card>
  );
}
