'use client';

import { useState } from 'react';
import { Web3Service } from '@/lib/services/web3.service';
import { ToolCard, SeedDerivationFields, OutputDisplay } from '@/components/tools';
import { Button } from '@/components/ui/button';

export default function GetAddrFromSeedPage() {
  const [seedPhrase, setSeedPhrase] = useState('');
  const [nrOfAddresses, setNrOfAddresses] = useState(5);
  const [derivationPath, setDerivationPath] = useState("m/44'/60'/0'/0/0");
  const [output, setOutput] = useState('');

  const getAddresses = () => {
    try {
      setOutput(Web3Service.getAddresses(seedPhrase, nrOfAddresses, derivationPath));
    } catch (error) {
      setOutput(String(error));
    }
  };

  return (
    <ToolCard title="Get Addresses from Seed" description="Enter a seed phrase to derive public addresses.">
      <SeedDerivationFields
        seedPhrase={seedPhrase}
        onSeedPhraseChange={setSeedPhrase}
        nrOfAddresses={nrOfAddresses}
        onNrOfAddressesChange={setNrOfAddresses}
        derivationPath={derivationPath}
        onDerivationPathChange={setDerivationPath}
      />
      <Button size="lg" onClick={getAddresses}>Get Addresses</Button>
      <OutputDisplay value={output} placeholder="Derived addresses will appear here..." />
    </ToolCard>
  );
}
