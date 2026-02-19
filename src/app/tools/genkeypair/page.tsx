'use client';
import { useState } from 'react';
import { Web3Service } from '@/lib/services/web3.service';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

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
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardContent className="pt-6 space-y-5">
        <div>
          <h3 className="text-lg font-semibold mb-1">Generate Key Pair(s)</h3>
          <p className="text-sm text-muted-foreground">Generate private keys and their corresponding public addresses.</p>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Number of key pairs</Label>
          <Input type="number" max={100} min={1} value={nrOfKeyPairs} onChange={(e) => setNrOfKeyPairs(Number(e.target.value))} className="max-w-[200px]" />
        </div>
        <Button onClick={generateKeyPairs}>Generate</Button>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Output</Label>
          <Textarea className="font-code" rows={20} disabled value={genKeyPairs} placeholder="Generated key pairs will appear here..." />
        </div>
      </CardContent>
    </Card>
  );
}
