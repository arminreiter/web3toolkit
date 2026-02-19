'use client';

import { Wallet, Code, Key, Link2, type LucideIcon } from 'lucide-react';
import { Action } from '@/lib/actions/action';
import { Actions } from '@/lib/actions/actions';
import { Module } from '@/lib/models/module';
import { useAppStore } from '@/lib/store';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const modules: { module: Module; icon: LucideIcon }[] = [
  { module: Module.KeyManagement, icon: Key },
  { module: Module.Wallet, icon: Wallet },
  { module: Module.Blockchain, icon: Link2 },
  { module: Module.Utils, icon: Code },
];

export function Sidebar() {
  const addAction = useAppStore((s) => s.addAction);
  const actions: Action[] = Actions.get();

  const getActions = (mod: Module) => actions.filter((x) => x.module === mod);

  const handleAddAction = (action: Action) => {
    addAction(action);
  };

  return (
    <div className="px-3 pt-3 text-foreground h-full flex flex-col">
      <div className="whitespace-nowrap text-center">Operations</div>
      <hr className="border-border my-2" />
      <Accordion type="multiple" defaultValue={modules.map((m) => m.module)} className="grow overflow-y-auto">
        {modules.map((mod) => (
          <AccordionItem key={mod.module} value={mod.module}>
            <AccordionTrigger className="py-1 text-sm">
              <span className="flex items-center gap-2">
                <mod.icon className="h-4 w-4" /> {mod.module}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              {getActions(mod.module).map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleAddAction(action)}
                  className="block w-full text-left py-1 pl-6 text-sm text-foreground hover:text-accent cursor-pointer bg-transparent border-0"
                  title={action.description}
                >
                  {action.title}
                  {action.requiresConnection && (
                    <img src="/img/circle.svg" className="p-2 float-right" title="This action requires an active internet connection." alt="requires connection" />
                  )}
                </button>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
