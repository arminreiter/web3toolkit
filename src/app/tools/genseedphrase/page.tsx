'use client';
import { useState } from 'react';
import { Web3Service } from '@/lib/services/web3.service';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function GenSeedPhrasePage() {
  const [nrOfSeeds, setNrOfSeeds] = useState(1);
  const [genSeeds, setGenSeeds] = useState('');

  const genSeedPhrase = () => {
    let result = '';
    for (let i = 0; i < nrOfSeeds; i++) {
      result += Web3Service.genSeedPhrase() + '\n';
    }
    setGenSeeds(result);
  };

  return (
    <Card>
      <CardHeader><h5>Generate Seed Phrase(s)</h5></CardHeader>
      <CardContent className="space-y-4">
        <p>Generate as much BIP-39 seed phrases as you want by clicking one button.</p>
        <div>
          <label className="text-sm">Number of seed phrases:</label>
          <Input type="number" max={100} min={1} value={nrOfSeeds} onChange={(e) => setNrOfSeeds(Number(e.target.value))} />
        </div>
        <Button onClick={genSeedPhrase}>Generate</Button>
        <Textarea className="font-code" rows={20} disabled value={genSeeds} />
      </CardContent>
    </Card>
  );
}
