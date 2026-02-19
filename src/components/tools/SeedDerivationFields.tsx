'use client';

import { FormField } from './FormField';

interface SeedDerivationFieldsProps {
  seedPhrase: string;
  onSeedPhraseChange: (value: string) => void;
  nrOfAddresses: number;
  onNrOfAddressesChange: (value: number) => void;
  derivationPath: string;
  onDerivationPathChange: (value: string) => void;
  seedLabel?: string;
  seedPlaceholder?: string;
  seedRows?: number;
}

export function SeedDerivationFields({
  seedPhrase,
  onSeedPhraseChange,
  nrOfAddresses,
  onNrOfAddressesChange,
  derivationPath,
  onDerivationPathChange,
  seedLabel = 'Seed phrase',
  seedPlaceholder = 'Enter your seed phrase...',
  seedRows = 2,
}: SeedDerivationFieldsProps) {
  return (
    <>
      <FormField
        label={seedLabel}
        multiline
        value={seedPhrase}
        onChange={onSeedPhraseChange}
        placeholder={seedPlaceholder}
        rows={seedRows}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          label="Number of addresses"
          type="number"
          value={nrOfAddresses}
          onChange={(v) => onNrOfAddressesChange(Number(v))}
          min={1}
          max={100}
        />
        <FormField
          label="Derivation path"
          value={derivationPath}
          onChange={onDerivationPathChange}
        />
      </div>
    </>
  );
}
