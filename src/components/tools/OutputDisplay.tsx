'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface OutputDisplayProps {
  label?: string;
  value: string;
  placeholder?: string;
  rows?: number;
}

export function OutputDisplay({ label = 'Output', value, placeholder = 'Results will appear here...', rows = 20 }: OutputDisplayProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-muted-foreground">{label}</Label>
        {value && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={copyToClipboard}
            title="Copy to clipboard"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
          </Button>
        )}
      </div>
      <Textarea className="font-code text-base text-muted-foreground" rows={rows} readOnly value={value} placeholder={placeholder} />
    </div>
  );
}
