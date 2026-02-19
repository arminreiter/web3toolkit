'use client';

import { Play, Trash2 } from 'lucide-react';
import { Action } from '@/lib/actions/action';
import { useAppStore } from '@/lib/store';
import { Card, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ActionCardProps {
  action: Action;
}

export function ActionCard({ action }: ActionCardProps) {
  const getInput = useAppStore((s) => s.getInput);
  const addResult = useAppStore((s) => s.addResult);
  const removeAction = useAppStore((s) => s.removeAction);

  const handleRun = () => {
    action.run(getInput()).then(
      (result) => addResult(action.title, result)
    ).catch((err) => {
      addResult(action.title, String(err));
    });
  };

  const handleRemove = () => {
    removeAction(action.id);
  };

  return (
    <Card className="mb-1 rounded">
      <CardHeader className="flex flex-row items-center justify-between py-2 px-3">
        <div className="text-sm">{action.title}</div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={handleRemove} className="h-7 w-7">
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleRun} className="h-7 w-7 text-green-500">
            <Play className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <div className="hide-if-empty" />
    </Card>
  );
}
