'use client';
import { useState } from 'react';
import { Web3Service } from '@/lib/services/web3.service';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

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
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardContent className="pt-6 space-y-5">
        <div>
          <h3 className="text-lg font-semibold mb-1">Generate Seed Phrase(s)</h3>
          <p className="text-sm text-muted-foreground">Generate BIP-39 compliant seed phrases with one click.</p>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Number of seed phrases</Label>
          <Input type="number" max={100} min={1} value={nrOfSeeds} onChange={(e) => setNrOfSeeds(Number(e.target.value))} className="max-w-[200px]" />
        </div>
        <Button onClick={genSeedPhrase}>Generate</Button>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Output</Label>
          <Textarea className="font-code" rows={20} disabled value={genSeeds} placeholder="Generated seed phrases will appear here..." />
        </div>
      </CardContent>
    </Card>
  );
}
