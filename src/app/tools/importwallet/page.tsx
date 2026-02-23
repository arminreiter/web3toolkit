'use client';

import { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import { Web3Service } from '@/lib/services/web3.service';
import { ToolCard, FormField, OutputDisplay, LoadingButton } from '@/components/tools';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ImportWalletPage() {
  const [json, setJson] = useState('');
  const [password, setPassword] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result;
      if (typeof text === 'string') setJson(text);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const importWallet = async () => {
    setLoading(true);
    setOutput('');
    try {
      const parsed = JSON.parse(json);

      if (parsed.crypto || parsed.Crypto) {
        const wallet = await Web3Service.importWalletFromJson(json, password);
        setOutput(`Address:     ${wallet.address}\nPrivate Key: ${wallet.privateKey}`);
      } else {
        setOutput('Error: Invalid keystore JSON. Expected a V3 keystore file (e.g. created by geth).');
      }
    } catch (error) {
      const msg = String(error);
      if (msg.includes('invalid password')) {
        setOutput('Error: Wrong password. Could not decrypt the keystore.');
      } else if (msg.includes('JSON')) {
        setOutput('Error: Invalid JSON format. Please paste valid keystore JSON.');
      } else {
        setOutput('Error: ' + msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolCard title="Import Wallet from JSON" description="Import a wallet from a V3 keystore JSON file (e.g. created by geth). Enter the password to decrypt, or leave empty if the keystore has no password.">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm text-muted-foreground">Keystore JSON</Label>
          <Button variant="outline" size="sm" className="gap-1.5" onClick={() => fileInputRef.current?.click()}>
            <Upload className="h-3.5 w-3.5" /> Load File
          </Button>
          <input ref={fileInputRef} type="file" accept=".json,application/json" onChange={handleFileSelect} className="hidden" />
        </div>
        <Textarea className="font-code" rows={12} value={json} onChange={(e) => setJson(e.target.value)} placeholder="Paste your keystore JSON here or load a file..." />
      </div>
      <FormField label="Password (optional)" type="password" value={password} onChange={setPassword} placeholder="Leave empty if keystore has no password" />
      <LoadingButton loading={loading} loadingText="Decrypting..." onClick={importWallet}>Import Wallet</LoadingButton>
      <OutputDisplay value={output} rows={4} placeholder="Address and private key will appear here..." />
    </ToolCard>
  );
}
