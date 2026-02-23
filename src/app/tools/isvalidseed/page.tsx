'use client';

import { useState } from 'react';
import { Web3Service } from '@/lib/services/web3.service';
import { ToolCard, FormField, OutputDisplay } from '@/components/tools';
import { Button } from '@/components/ui/button';

export default function IsValidSeedPage() {
  const [seeds, setSeeds] = useState('');
  const [output, setOutput] = useState('');

  const isValidSeed = () => {
    const lines = seeds.split('\n');
    const result = lines
      .filter((seed) => seed.length > 0)
      .map((seed) => `${seed}: ${Web3Service.isValidSeedPhrase(seed)}`)
      .join('\n');
    setOutput(result);
  };

  return (
    <ToolCard title="Validate Seed Phrases" description="Check whether seed phrases are valid BIP-39 mnemonics.">
      <FormField label="Seed phrases (one per line)" multiline value={seeds} onChange={setSeeds} placeholder="Enter seed phrases to validate..." rows={5} />
      <Button size="lg" onClick={isValidSeed}>Check</Button>
      <OutputDisplay value={output} placeholder="Validation results will appear here..." />
    </ToolCard>
  );
}
