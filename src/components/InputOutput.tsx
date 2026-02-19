'use client';

import { Trash2 } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Card, CardHeader } from '@/components/ui/card';
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
      <Card className="my-1">
        <CardHeader className="flex flex-row items-center justify-between py-2 px-3 font-bold">
          <div>Input &amp; Results</div>
          <div>
            <Button variant="ghost" size="icon" onClick={clear} className="h-7 w-7">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="my-1 space-y-1">
        <Label htmlFor="floatingInput">Input</Label>
        <Textarea
          className="w-full min-h-[80px]"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          id="floatingInput"
        />
      </div>

      {results.map((res, idx) => (
        <div key={idx} className="mb-1 space-y-1">
          <Label>{res.actionName}</Label>
          <Textarea
            className="w-full"
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
