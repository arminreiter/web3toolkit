'use client';

import { useState } from 'react';
import { Web3Service } from '@/lib/services/web3.service';
import { ToolCard, SeedDerivationFields, OutputDisplay } from '@/components/tools';
import { Button } from '@/components/ui/button';

export default function GetAddrKeysFromSeedPage() {
  const [seedPhrase, setSeedPhrase] = useState('');
  const [nrOfAddresses, setNrOfAddresses] = useState(5);
  const [derivationPath, setDerivationPath] = useState("m/44'/60'/0'/0/0");
  const [output, setOutput] = useState('');

  const getAddresses = () => {
    try {
      const keys = Web3Service.getPrivateKeys(seedPhrase, nrOfAddresses, derivationPath);
      let result = 'Public Address                             - Private key\n';
      keys.forEach((key) => {
        const address = Web3Service.getAddressFromPrivateKey(key);
        result += address + ' - ' + key + '\n';
      });
      setOutput(result);
    } catch (error) {
      setOutput(String(error));
    }
  };

  return (
    <ToolCard title="Get Addresses & Keys from Seed" description="Derive both public addresses and private keys from a seed phrase.">
      <SeedDerivationFields
        seedPhrase={seedPhrase}
        onSeedPhraseChange={setSeedPhrase}
        nrOfAddresses={nrOfAddresses}
        onNrOfAddressesChange={setNrOfAddresses}
        derivationPath={derivationPath}
        onDerivationPathChange={setDerivationPath}
      />
      <Button size="lg" onClick={getAddresses}>Get Addresses & Keys</Button>
      <OutputDisplay value={output} placeholder="Addresses and keys will appear here..." />
    </ToolCard>
  );
}
