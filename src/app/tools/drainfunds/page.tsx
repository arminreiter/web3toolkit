'use client';

import { useState } from 'react';
import { Web3Service } from '@/lib/services/web3.service';
import { useAppStore } from '@/lib/store';
import { ToolCard, FormField, SeedDerivationFields, OutputDisplay, LoadingButton } from '@/components/tools';

export default function DrainFundsPage() {
  const network = useAppStore((s) => s.network);
  const [input, setInput] = useState('');
  const [nrOfAddresses, setNrOfAddresses] = useState(5);
  const [derivationPath, setDerivationPath] = useState("m/44'/60'/0'/0/0");
  const [targetAddress, setTargetAddress] = useState('');
  const [gas, setGas] = useState(21000);
  const [gasPrice, setGasPrice] = useState(10);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const drain = async (key: string) => {
    const tmpResult = await Web3Service.drainFunds(key, targetAddress, network, gas, gasPrice);
    if (tmpResult.length > 0) {
      setOutput((prev) => prev + tmpResult + '\n');
    }
  };

  const drainFunds = async () => {
    setLoading(true);
    setOutput('');
    try {
      if (!Web3Service.isValidAddress(targetAddress)) {
        setOutput('Target address is invalid!');
        return;
      }

      const phrases = input.split('\n').map((element) => element.trim());

      for (const line of phrases) {
        if (line.length < 2) continue;

        if (line.startsWith('0x')) {
          await drain(line);
        } else {
          const keys = Web3Service.getPrivateKeys(line, nrOfAddresses, derivationPath);
          for (const key of keys) {
            await drain(key);
          }
        }
      }
    } catch (error) {
      setOutput(String(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolCard title="Drain Funds" description="Transfer all funds from seed phrases or private keys to a target address.">
      <SeedDerivationFields
        seedPhrase={input}
        onSeedPhraseChange={setInput}
        nrOfAddresses={nrOfAddresses}
        onNrOfAddressesChange={setNrOfAddresses}
        derivationPath={derivationPath}
        onDerivationPathChange={setDerivationPath}
        seedLabel="Seed phrases or private keys (one per line)"
        seedPlaceholder="Enter seed phrases or private keys..."
      />
      <FormField label="Target Address" value={targetAddress} onChange={setTargetAddress} placeholder="Address to receive funds" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Gas" type="number" value={gas} onChange={(v) => setGas(Number(v))} />
        <FormField label="Gas Price (Gwei)" type="number" value={gasPrice} onChange={(v) => setGasPrice(Number(v))} />
      </div>
      <LoadingButton loading={loading} loadingText="Processing..." onClick={drainFunds}>Drain Funds</LoadingButton>
      <OutputDisplay value={output} placeholder="Transaction results will appear here..." />
    </ToolCard>
  );
}
