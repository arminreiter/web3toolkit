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
      <div className="flex items-center justify-between px-4 py-3.5 mb-4 rounded-lg bg-secondary/50 border border-border/50">
        <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Input & Results</span>
        <Button variant="ghost" size="icon-sm" onClick={clear} className="text-muted-foreground hover:text-destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2.5 mb-4">
        <Label htmlFor="floatingInput" className="text-sm font-medium text-muted-foreground">Input</Label>
        <Textarea
          className="w-full min-h-[80px] font-code text-base"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          id="floatingInput"
          placeholder="Enter input data..."
        />
      </div>

      {results.map((res, idx) => (
        <div key={idx} className="mb-4 space-y-2.5">
          <Label className="text-sm font-medium text-primary">{res.actionName}</Label>
          <Textarea
            className="w-full font-code text-base"
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
