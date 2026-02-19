'use client';

import { useState } from 'react';
import { ArrowRightLeft, Copy, Check } from 'lucide-react';
import { Web3Service } from '@/lib/services/web3.service';
import { ToolCard, FormField, LoadingButton } from '@/components/tools';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

type Mode = 'name-to-address' | 'address-to-name';

const LABEL_MAP: Record<string, string> = {
  'Address': 'Address',
  'ENS Name': 'ENS Name',
  'Resolved Address': 'Resolved Address',
  'Content Hash': 'Content Hash',
  'avatar': 'Avatar',
  'email': 'Email',
  'url': 'URL',
  'description': 'Description',
  'com.twitter': 'Twitter',
  'com.github': 'GitHub',
  'com.discord': 'Discord',
  'org.telegram': 'Telegram',
};

function CopyValue({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className="text-muted-foreground hover:text-foreground transition-colors" title="Copy">
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

export default function ENSResolverPage() {
  const [mode, setMode] = useState<Mode>('name-to-address');
  const [input, setInput] = useState('');
  const [records, setRecords] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const resolve = async () => {
    setLoading(true);
    setRecords(null);
    setError('');
    try {
      if (mode === 'name-to-address') {
        setRecords(await Web3Service.resolveENS(input.trim()));
      } else {
        setRecords(await Web3Service.lookupENS(input.trim()));
      }
    } catch (err) {
      setError(String(err).replace(/^Error:\s*/, ''));
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (newMode: Mode) => {
    setMode(newMode);
    setInput('');
    setRecords(null);
    setError('');
  };

  const isForward = mode === 'name-to-address';

  return (
    <ToolCard title="ENS Resolver" description="Resolve ENS names to addresses or reverse-lookup addresses to ENS names. Always uses Ethereum mainnet.">
      <div className="flex items-center gap-3">
        <Button variant={isForward ? 'default' : 'outline'} size="sm" onClick={() => switchMode('name-to-address')}>
          Name → Address
        </Button>
        <Button variant="ghost" size="icon-sm" onClick={() => switchMode(isForward ? 'address-to-name' : 'name-to-address')} title="Switch direction">
          <ArrowRightLeft className="h-4 w-4" />
        </Button>
        <Button variant={!isForward ? 'default' : 'outline'} size="sm" onClick={() => switchMode('address-to-name')}>
          Address → Name
        </Button>
      </div>
      <FormField
        label={isForward ? 'ENS Name' : 'Ethereum Address'}
        value={input}
        onChange={setInput}
        placeholder={isForward ? 'vitalik.eth' : '0x...'}
      />
      <LoadingButton loading={loading} loadingText="Resolving..." onClick={resolve}>Resolve</LoadingButton>

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {records && (
        <div className="rounded-lg border border-border/50 bg-secondary/30 divide-y divide-border/40">
          {Object.entries(records).map(([key, value]) => (
            <div key={key} className="flex items-start justify-between gap-4 px-5 py-3.5">
              <Label className="text-sm text-muted-foreground shrink-0 pt-0.5">
                {LABEL_MAP[key] ?? key}
              </Label>
              <div className="flex items-start gap-2 min-w-0">
                <span className="font-code text-sm text-foreground break-all text-right">{value}</span>
                <CopyValue value={value} />
              </div>
            </div>
          ))}
        </div>
      )}
    </ToolCard>
  );
}
