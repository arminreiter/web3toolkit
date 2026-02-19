'use client';

import { Play, Trash2 } from 'lucide-react';
import { Action } from '@/lib/actions/action';
import { useAppStore } from '@/lib/store';
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
    <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-border/50 bg-card/50 hover:border-border transition-colors duration-150">
      <span className="text-base text-foreground">{action.title}</span>
      <div className="flex gap-1">
        <Button variant="ghost" size="icon-sm" onClick={handleRemove} className="text-muted-foreground hover:text-destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon-sm" onClick={handleRun} className="text-emerald-400 hover:text-emerald-300">
          <Play className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
