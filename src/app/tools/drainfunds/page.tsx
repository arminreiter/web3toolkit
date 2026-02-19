'use client';
import { useState } from 'react';
import { Web3Service } from '@/lib/services/web3.service';
import { useAppStore } from '@/lib/store';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function DrainFundsPage() {
  const network = useAppStore((s) => s.network);
  const [input, setInput] = useState('');
  const [nrOfAddresses, setNrOfAddresses] = useState(5);
  const [derivationPath, setDerivationPath] = useState("m/44'/60'/0'/0/0");
  const [targetAddress, setTargetAddress] = useState('');
  const [gas, setGas] = useState(21000);
  const [gasPrice, setGasPrice] = useState(10);
  const [output, setOutput] = useState('');

  const drain = async (key: string) => {
    const tmpResult = await Web3Service.drainFunds(key, targetAddress, network, gas, gasPrice);
    if (tmpResult.length > 0) {
      setOutput((prev) => prev + tmpResult + '\n');
    }
  };

  const drainFunds = async () => {
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
    }
  };

  return (
    <Card>
      <CardHeader><h5>Drain Funds</h5></CardHeader>
      <CardContent className="space-y-4">
        <p>
          Enter one or multiple seed phrases or private keys as well as a target address which will receive the funds.
          Press the &apos;Drain Funds&apos; button and all funds will be transfered from seed phrase/private key to the target address.
        </p>
        <Textarea className="font-code" rows={2} value={input} onChange={(e) => setInput(e.target.value)} />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Number of derived addresses:</label>
            <Input type="number" max={100} min={1} value={nrOfAddresses} onChange={(e) => setNrOfAddresses(Number(e.target.value))} />
          </div>
          <div>
            <label className="text-sm">Derivation path:</label>
            <Input type="text" value={derivationPath} onChange={(e) => setDerivationPath(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="text-sm">Target Address:</label>
          <Input type="text" value={targetAddress} onChange={(e) => setTargetAddress(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Gas:</label>
            <Input type="number" value={gas} onChange={(e) => setGas(Number(e.target.value))} />
          </div>
          <div>
            <label className="text-sm">Gas Price (Gwei):</label>
            <Input type="number" value={gasPrice} onChange={(e) => setGasPrice(Number(e.target.value))} />
          </div>
        </div>
        <Button onClick={drainFunds}>Drain Funds</Button>
        <Textarea className="font-code" rows={20} disabled value={output} />
      </CardContent>
    </Card>
  );
}
