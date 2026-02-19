'use client';
import { useState } from 'react';
import Web3 from 'web3';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

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
    <Card>
      <CardHeader><h5>Wei converter</h5></CardHeader>
      <CardContent className="space-y-4">
        <p>Converts Wei to Gwei and Ether</p>
        <div>
          <label className="text-sm">Wei:</label>
          <Input type="number" value={wei} onChange={(e) => fwei(e.target.value)} />
        </div>
        <div>
          <label className="text-sm">Gwei:</label>
          <Input type="number" value={gwei} onChange={(e) => fgwei(e.target.value)} />
        </div>
        <div>
          <label className="text-sm">Ether:</label>
          <Input type="number" value={ether} onChange={(e) => fether(e.target.value)} />
        </div>
      </CardContent>
    </Card>
  );
}
