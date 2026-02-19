'use client';
import { useState } from 'react';
import Web3 from 'web3';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function WeiConverterPage() {
  const [wei, setWei] = useState('1');
  const [gwei, setGwei] = useState(() => Web3.utils.fromWei('1', 'gwei'));
  const [ether, setEther] = useState(() => Web3.utils.fromWei('1', 'ether'));

  const fwei = (value: string) => {
    setWei(value);
    try {
      setEther(Web3.utils.fromWei(String(value), 'ether'));
      setGwei(Web3.utils.fromWei(String(value), 'gwei'));
    } catch {}
  };

  const fgwei = (value: string) => {
    setGwei(value);
    try {
      const weiVal = Web3.utils.toWei(String(value), 'gwei');
      setWei(weiVal);
      setEther(Web3.utils.fromWei(String(weiVal), 'ether'));
    } catch {}
  };

  const fether = (value: string) => {
    setEther(value);
    try {
      const weiVal = Web3.utils.toWei(String(value), 'ether');
      setWei(weiVal);
      setGwei(Web3.utils.fromWei(String(weiVal), 'gwei'));
    } catch {}
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardContent className="pt-6 space-y-5">
        <div>
          <h3 className="text-lg font-semibold mb-1">Wei Converter</h3>
          <p className="text-sm text-muted-foreground">Convert between Wei, Gwei, and Ether denominations.</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Wei</Label>
            <Input type="number" value={wei} onChange={(e) => fwei(e.target.value)} className="font-code" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Gwei</Label>
            <Input type="number" value={gwei} onChange={(e) => fgwei(e.target.value)} className="font-code" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Ether</Label>
            <Input type="number" value={ether} onChange={(e) => fether(e.target.value)} className="font-code" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
