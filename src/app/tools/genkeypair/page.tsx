'use client';

import { useState } from 'react';
import { Web3Service } from '@/lib/services/web3.service';
import { ToolCard, FormField, OutputDisplay } from '@/components/tools';
import { Button } from '@/components/ui/button';

export default function GenKeyPairPage() {
  const [nrOfKeyPairs, setNrOfKeyPairs] = useState(1);
  const [output, setOutput] = useState('');

  const generateKeyPairs = () => {
    let result = 'Private Key,                                                        Public Address\n';
    for (let i = 0; i < nrOfKeyPairs; i++) {
      result += Web3Service.genKeyPair() + '\n';
    }
    setOutput(result);
  };

  return (
    <ToolCard title="Generate Key Pair(s)" description="Generate private keys and their corresponding public addresses.">
      <FormField label="Number of key pairs" type="number" value={nrOfKeyPairs} onChange={(v) => setNrOfKeyPairs(Number(v))} min={1} max={100} inputClassName="max-w-[200px]" />
      <Button size="lg" onClick={generateKeyPairs}>Generate</Button>
      <OutputDisplay value={output} placeholder="Generated key pairs will appear here..." />
    </ToolCard>
  );
}
