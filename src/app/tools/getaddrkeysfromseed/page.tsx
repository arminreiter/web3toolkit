'use client';
import { useState } from 'react';
import { Web3Service } from '@/lib/services/web3.service';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

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
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardContent className="pt-6 space-y-5">
        <div>
          <h3 className="text-lg font-semibold mb-1">Get Addresses & Keys from Seed</h3>
          <p className="text-sm text-muted-foreground">Derive both public addresses and private keys from a seed phrase.</p>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Seed phrase</Label>
          <Textarea className="font-code" rows={2} value={seedPhrase} onChange={(e) => setSeedPhrase(e.target.value)} placeholder="Enter your seed phrase..." />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Number of addresses</Label>
            <Input type="number" max={100} min={1} value={nrOfAddresses} onChange={(e) => setNrOfAddresses(Number(e.target.value))} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Derivation path</Label>
            <Input type="text" value={derivationPath} onChange={(e) => setDerivationPath(e.target.value)} />
          </div>
        </div>
        <Button onClick={getAddresses}>Get Addresses & Keys</Button>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Output</Label>
          <Textarea className="font-code" rows={20} disabled value={genAddresses} placeholder="Addresses and keys will appear here..." />
        </div>
      </CardContent>
    </Card>
  );
}
