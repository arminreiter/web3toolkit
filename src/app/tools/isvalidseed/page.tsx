'use client';
import { useState } from 'react';
import { Web3Service } from '@/lib/services/web3.service';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function IsValidSeedPage() {
  const [seeds, setSeeds] = useState('');
  const [result, setResult] = useState('');

  const isValidSeed = () => {
    let output = '';
    const lines = seeds.split('\n');
    lines.forEach((seed) => {
      if (seed.length > 0) {
        const valid = Web3Service.isValidSeedPhrase(seed);
        output += seed + ': ' + valid + '\n';
      }
    });
    setResult(output);
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardContent className="pt-6 space-y-5">
        <div>
          <h3 className="text-lg font-semibold mb-1">Validate Seed Phrases</h3>
          <p className="text-sm text-muted-foreground">Check whether seed phrases are valid BIP-39 mnemonics.</p>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Seed phrases (one per line)</Label>
          <Textarea className="font-code" rows={5} value={seeds} onChange={(e) => setSeeds(e.target.value)} placeholder="Enter seed phrases to validate..." />
        </div>
        <Button onClick={isValidSeed}>Check</Button>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Output</Label>
          <Textarea className="font-code" rows={20} disabled value={result} placeholder="Validation results will appear here..." />
        </div>
      </CardContent>
    </Card>
  );
}
