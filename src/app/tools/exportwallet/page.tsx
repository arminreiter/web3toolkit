'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';
import { Web3Service } from '@/lib/services/web3.service';
import { ToolCard, FormField, OutputDisplay, LoadingButton } from '@/components/tools';
import { Button } from '@/components/ui/button';

export default function ExportWalletPage() {
  const [privateKey, setPrivateKey] = useState('');
  const [password, setPassword] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const exportWallet = async () => {
    setLoading(true);
    setOutput('');
    try {
      const json = await Web3Service.exportWalletToJson(privateKey.trim(), password);
      setOutput(JSON.stringify(JSON.parse(json), null, 2));
    } catch (error) {
      setOutput('Error: ' + String(error));
    } finally {
      setLoading(false);
    }
  };

  const downloadJson = () => {
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'keystore.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolCard title="Export Wallet to JSON" description="Export a private key to a JSON file. Provide a password to create an encrypted V3 keystore, or leave it empty for a plain JSON export.">
      <FormField label="Private Key" type="password" value={privateKey} onChange={setPrivateKey} placeholder="Enter private key (with or without 0x prefix)" />
      <FormField label="Password (optional)" type="password" value={password} onChange={setPassword} placeholder="Leave empty for unencrypted JSON" />
      <LoadingButton loading={loading} loadingText={password ? 'Encrypting...' : 'Exporting...'} onClick={exportWallet}>Export Wallet</LoadingButton>
      {output && !output.startsWith('Error') && (
        <Button variant="outline" className="gap-1.5" onClick={downloadJson}>
          <Download className="h-3.5 w-3.5" /> Download JSON
        </Button>
      )}
      <OutputDisplay value={output} rows={12} placeholder="Encrypted keystore JSON will appear here..." />
    </ToolCard>
  );
}
