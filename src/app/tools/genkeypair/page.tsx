'use client';
import { useState } from 'react';
import { Web3Service } from '@/lib/services/web3.service';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function GenKeyPairPage() {
  const [nrOfKeyPairs, setNrOfKeyPairs] = useState(1);
  const [genKeyPairs, setGenKeyPairs] = useState('');

  const generateKeyPairs = () => {
    let result = 'Private Key,                                                        Public Address\n';
    for (let i = 0; i < nrOfKeyPairs; i++) {
      result += Web3Service.genKeyPair() + '\n';
    }
    setGenKeyPairs(result);
  };

  return (
    <Card>
      <CardHeader><h5>Generate Key Pair(s)</h5></CardHeader>
      <CardContent className="space-y-4">
        <p>Generate as much private keys and addresses as you want by clicking one button.</p>
        <div>
          <label className="text-sm">Number of key pairs:</label>
          <Input type="number" max={100} min={1} value={nrOfKeyPairs} onChange={(e) => setNrOfKeyPairs(Number(e.target.value))} />
        </div>
        <Button onClick={generateKeyPairs}>Generate</Button>
        <Textarea className="font-code" rows={20} disabled value={genKeyPairs} />
      </CardContent>
    </Card>
  );
}
