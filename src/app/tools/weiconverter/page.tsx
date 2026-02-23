'use client';

import { useState } from 'react';
import { formatUnits, parseUnits } from 'ethers';
import { ToolCard, FormField } from '@/components/tools';

export default function WeiConverterPage() {
  const [wei, setWei] = useState('1');
  const [gwei, setGwei] = useState(() => formatUnits('1', 'gwei'));
  const [ether, setEther] = useState(() => formatUnits('1', 'ether'));

  const fromWei = (value: string) => {
    setWei(value);
    try {
      setEther(formatUnits(value, 'ether'));
      setGwei(formatUnits(value, 'gwei'));
    } catch {}
  };

  const fromGwei = (value: string) => {
    setGwei(value);
    try {
      const weiVal = parseUnits(value, 'gwei').toString();
      setWei(weiVal);
      setEther(formatUnits(weiVal, 'ether'));
    } catch {}
  };

  const fromEther = (value: string) => {
    setEther(value);
    try {
      const weiVal = parseUnits(value, 'ether').toString();
      setWei(weiVal);
      setGwei(formatUnits(weiVal, 'gwei'));
    } catch {}
  };

  return (
    <ToolCard title="Wei Converter" description="Convert between Wei, Gwei, and Ether denominations.">
      <div className="space-y-4">
        <FormField label="Wei" type="number" value={wei} onChange={fromWei} inputClassName="font-code" />
        <FormField label="Gwei" type="number" value={gwei} onChange={fromGwei} inputClassName="font-code" />
        <FormField label="Ether" type="number" value={ether} onChange={fromEther} inputClassName="font-code" />
      </div>
    </ToolCard>
  );
}
