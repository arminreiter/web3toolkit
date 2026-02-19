'use client';
import { useState } from 'react';
import { Web3Service } from '@/lib/services/web3.service';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function GetAddrKeysFromSeedPage() {
  const [seedPhrase, setSeedPhrase] = useState('');
  const [nrOfAddresses, setNrOfAddresses] = useState(5);
  const [derivationPath, setDerivationPath] = useState("m/44'/60'/0'/0/0");
  const [genAddresses, setGenAddresses] = useState('');

  const getAddresses = () => {
    try {
      const keys = Web3Service.getPrivateKeys(seedPhrase, nrOfAddresses, derivationPath);
      let result = 'Public Address                             - Private key\n';
      keys.forEach((key) => {
        const address = Web3Service.getAddressFromPrivateKey(key);
        result += address + ' - ' + key + '\n';
      });
      setGenAddresses(result);
    } catch (error) {
      setGenAddresses(String(error));
    }
  };

  return (
    <Card>
      <CardHeader><h5>Get public addresses and private keys from seed phrase</h5></CardHeader>
      <CardContent className="space-y-4">
        <p>Enter a seed phrase and derive as much public addresses and private keys as you want.</p>
        <Textarea className="font-code" rows={2} value={seedPhrase} onChange={(e) => setSeedPhrase(e.target.value)} />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Number of derived addresses:</label>
            <Input type="number" max={100} min={1} value={nrOfAddresses} onChange={(e) => setNrOfAddresses(Number(e.target.value))} />
          </div>
          <div>
            <label className="text-sm">Derivation path:</label>
            <Input type="text" value={derivationPath} onChange={(e) => setDerivationPath(e.target.value)} />
          </div>
        </div>
        <Button onClick={getAddresses}>Get Addresses &amp; Keys</Button>
        <Textarea className="font-code" rows={20} disabled value={genAddresses} />
      </CardContent>
    </Card>
  );
}
