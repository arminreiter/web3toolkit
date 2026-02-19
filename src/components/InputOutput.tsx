'use client';

import { Trash2 } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function InputOutput() {
  const input = useAppStore((s) => s.input);
  const setInput = useAppStore((s) => s.setInput);
  const results = useAppStore((s) => s.results);
  const clear = useAppStore((s) => s.clear);

  return (
    <>
      <div className="flex items-center justify-between px-3 py-2.5 mb-2 rounded-lg bg-secondary/50 border border-border/50">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Input & Results</span>
        <Button variant="ghost" size="icon-xs" onClick={clear} className="text-muted-foreground hover:text-destructive">
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="space-y-1 mb-3">
        <Label htmlFor="floatingInput" className="text-xs text-muted-foreground">Input</Label>
        <Textarea
          className="w-full min-h-[80px] font-code"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          id="floatingInput"
          placeholder="Enter input data..."
        />
      </div>

      {results.map((res, idx) => (
        <div key={idx} className="mb-2 space-y-1">
          <Label className="text-xs text-primary">{res.actionName}</Label>
          <Textarea
            className="w-full font-code"
            style={{ height: '100%' }}
            rows={res.result.split('\n').length}
            readOnly
            value={res.result}
          />
        </div>
      ))}
    </>
  );
}
