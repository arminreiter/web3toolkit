'use client';

import { useState } from 'react';
import { Web3Service } from '@/lib/services/web3.service';
import { useAppStore } from '@/lib/store';
import { ToolCard, FormField, OutputDisplay, LoadingButton } from '@/components/tools';

export default function GetTransactionPage() {
  const network = useAppStore((s) => s.network);
  const [txHash, setTxHash] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const getTransaction = async () => {
    setLoading(true);
    setOutput('');
    try {
      setOutput(await Web3Service.getTransaction(txHash, network));
    } catch (error) {
      setOutput(String(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolCard title="Get Transaction" description="Look up a transaction by its hash.">
      <FormField label="Transaction Hash" value={txHash} onChange={setTxHash} placeholder="0x..." />
      <LoadingButton loading={loading} loadingText="Fetching..." onClick={getTransaction}>Get Transaction</LoadingButton>
      <OutputDisplay value={output} placeholder="Transaction data will appear here..." />
    </ToolCard>
  );
}
