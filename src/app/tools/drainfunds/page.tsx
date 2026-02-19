'use client';
import { useState } from 'react';
import { Web3Service } from '@/lib/services/web3.service';
import { useAppStore } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

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
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardContent className="pt-6 space-y-5">
        <div>
          <h3 className="text-lg font-semibold mb-1">Drain Funds</h3>
          <p className="text-sm text-muted-foreground">
            Transfer all funds from seed phrases or private keys to a target address.
          </p>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Seed phrases or private keys (one per line)</Label>
          <Textarea className="font-code" rows={2} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter seed phrases or private keys..." />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Number of derived addresses</Label>
            <Input type="number" max={100} min={1} value={nrOfAddresses} onChange={(e) => setNrOfAddresses(Number(e.target.value))} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Derivation path</Label>
            <Input type="text" value={derivationPath} onChange={(e) => setDerivationPath(e.target.value)} />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Target Address</Label>
          <Input type="text" value={targetAddress} onChange={(e) => setTargetAddress(e.target.value)} placeholder="Address to receive funds" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Gas</Label>
            <Input type="number" value={gas} onChange={(e) => setGas(Number(e.target.value))} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Gas Price (Gwei)</Label>
            <Input type="number" value={gasPrice} onChange={(e) => setGasPrice(Number(e.target.value))} />
          </div>
        </div>
        <Button onClick={drainFunds}>Drain Funds</Button>
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Output</Label>
          <Textarea className="font-code" rows={20} disabled value={output} placeholder="Transaction results will appear here..." />
        </div>
      </CardContent>
    </Card>
  );
}
