'use client';

import { useState } from 'react';
import { Web3Service } from '@/lib/services/web3.service';
import { ToolCard, FormField, OutputDisplay } from '@/components/tools';
import { Button } from '@/components/ui/button';

export default function GetAddrFromKeyPage() {
  const [privateKeys, setPrivateKeys] = useState('');
  const [output, setOutput] = useState('');

  const getAddresses = () => {
    try {
      const addresses = Web3Service.getAddressFromPrivateKeys(privateKeys.split('\n'));
      setOutput(addresses.join('\n'));
    } catch (error) {
      setOutput(String(error));
    }
  };

  return (
    <ToolCard title="Get Addresses from Key" description="Enter private keys to derive their public addresses.">
      <FormField label="Private keys (one per line)" multiline value={privateKeys} onChange={setPrivateKeys} placeholder="Enter private keys..." />
      <Button size="lg" onClick={getAddresses}>Get Address(es)</Button>
      <OutputDisplay value={output} placeholder="Public addresses will appear here..." />
    </ToolCard>
  );
}
