'use client';

import { useState } from 'react';
import { Web3Service } from '@/lib/services/web3.service';
import { ToolCard, FormField, OutputDisplay } from '@/components/tools';
import { Button } from '@/components/ui/button';

export default function IsValidAddressPage() {
  const [address, setAddress] = useState('');
  const [output, setOutput] = useState('');

  const isValidAddress = () => {
    const addresses = address.split('\n');
    const result = addresses
      .filter((add) => add.length > 0)
      .map((add) => `${add}: ${Web3Service.isValidAddress(add)}`)
      .join('\n');
    setOutput(result);
  };

  return (
    <ToolCard title="Validate Addresses" description="Check whether addresses are valid blockchain addresses.">
      <FormField label="Public addresses (one per line)" multiline value={address} onChange={setAddress} placeholder="Enter addresses to validate..." rows={5} />
      <Button size="lg" onClick={isValidAddress}>Check</Button>
      <OutputDisplay value={output} placeholder="Validation results will appear here..." />
    </ToolCard>
  );
}
