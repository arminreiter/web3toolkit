'use client';
import { useState } from 'react';
import { Web3Service } from '@/lib/services/web3.service';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

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
    <Card>
      <CardHeader><h5>Check if the entered seed phrase(s) are valid</h5></CardHeader>
      <CardContent className="space-y-4">
        <p>Enter seed phrase(s):</p>
        <Textarea className="font-code" rows={5} value={seeds} onChange={(e) => setSeeds(e.target.value)} />
        <Button onClick={isValidSeed}>Check</Button>
        <Textarea className="font-code" rows={20} disabled value={result} />
      </CardContent>
    </Card>
  );
}
