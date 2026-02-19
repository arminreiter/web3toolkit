'use client';

import { Play, Trash2 } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { ActionCard } from './layout/ActionCard';
import { Action } from '@/lib/actions/action';
import { Button } from '@/components/ui/button';

export function ActionsInUse() {
  const actions = useAppStore((s) => s.actions);
  const getInput = useAppStore((s) => s.getInput);
  const addResult = useAppStore((s) => s.addResult);

  const play = async () => {
    for (const action of actions) {
      await executeAction(action);
    }
  };

  const executeAction = (action: Action): Promise<void> => {
    return new Promise(async (resolve) => {
      setTimeout(async () => {
        try {
          const result = await action.run(getInput());
          addResult(action.title, result);
        } catch (error) {
          addResult(action.title, String(error));
        }
        resolve();
      });
    });
  };

  const clear = () => {
    useAppStore.setState({ actions: [] });
  };

  return (
    <>
      <div className="flex items-center justify-between px-3 py-2.5 mb-2 rounded-lg bg-primary/5 border border-primary/10">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">Actions</span>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon-xs" onClick={clear} className="text-muted-foreground hover:text-destructive">
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon-xs" onClick={play} className="text-emerald-400 hover:text-emerald-300">
            <Play className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        {actions.map((action) => (
          <ActionCard key={action.id} action={action} />
        ))}
        {actions.length === 0 && (
          <div className="text-center py-8 text-sm text-muted-foreground/60">
            Add operations from the sidebar
          </div>
        )}
      </div>
    </>
  );
}
