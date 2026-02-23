'use client';

import { useState } from 'react';
import { Web3Service } from '@/lib/services/web3.service';
import { ToolCard, FormField, OutputDisplay } from '@/components/tools';
import { Button } from '@/components/ui/button';

export default function GenSeedPhrasePage() {
  const [nrOfSeeds, setNrOfSeeds] = useState(1);
  const [output, setOutput] = useState('');

  const genSeedPhrase = () => {
    let result = '';
    for (let i = 0; i < nrOfSeeds; i++) {
      result += Web3Service.genSeedPhrase() + '\n';
    }
    setOutput(result);
  };

  return (
    <ToolCard title="Generate Seed Phrase(s)" description="Generate BIP-39 compliant seed phrases with one click.">
      <FormField label="Number of seed phrases" type="number" value={nrOfSeeds} onChange={(v) => setNrOfSeeds(Number(v))} min={1} max={100} inputClassName="max-w-[200px]" />
      <Button size="lg" onClick={genSeedPhrase}>Generate</Button>
      <OutputDisplay value={output} placeholder="Generated seed phrases will appear here..." />
    </ToolCard>
  );
}
