'use client';

import { useState } from 'react';
import { Web3Service } from '@/lib/services/web3.service';
import { useAppStore } from '@/lib/store';
import { ToolCard, FormField, OutputDisplay, LoadingButton } from '@/components/tools';

export default function GetBlockPage() {
  const network = useAppStore((s) => s.network);
  const [blockNumber, setBlockNumber] = useState(0);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const getBlock = async () => {
    setLoading(true);
    setOutput('');
    try {
      setOutput(await Web3Service.getBlock(blockNumber, network));
    } catch (error) {
      setOutput(String(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolCard title="Get Block" description="Read the data of a block by its number.">
      <FormField label="Block Number" type="number" value={blockNumber} onChange={(v) => setBlockNumber(Number(v))} min={0} inputClassName="max-w-[300px]" />
      <LoadingButton loading={loading} loadingText="Fetching..." onClick={getBlock}>Get Block</LoadingButton>
      <OutputDisplay value={output} placeholder="Block data will appear here..." />
    </ToolCard>
  );
}
