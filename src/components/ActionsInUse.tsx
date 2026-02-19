'use client';

import { Play, Trash2 } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { ActionCard } from './layout/ActionCard';
import { Action } from '@/lib/actions/action';
import { Card, CardHeader } from '@/components/ui/card';
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
      <Card className="mb-1 bg-primary/10">
        <CardHeader className="flex flex-row items-center justify-between py-2 px-3 font-bold">
          <div>Actions</div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={clear} className="h-7 w-7">
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={play} className="h-7 w-7 text-green-500">
              <Play className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>
      <div>
        {actions.map((action) => (
          <ActionCard key={action.id} action={action} />
        ))}
      </div>
    </>
  );
}
