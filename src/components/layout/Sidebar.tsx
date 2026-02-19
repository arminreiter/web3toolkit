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
    <div className="px-3 pt-4 text-foreground h-full flex flex-col bg-[#080d18]">
      <div className="text-xs uppercase tracking-widest text-center text-muted-foreground font-medium mb-1">Operations</div>
      <div className="mx-2 h-px bg-gradient-to-r from-transparent via-border to-transparent mb-2" />
      <Accordion type="multiple" defaultValue={modules.map((m) => m.module)} className="grow overflow-y-auto">
        {modules.map((mod) => (
          <AccordionItem key={mod.module} value={mod.module} className="border-border/50">
            <AccordionTrigger className="py-2 text-sm hover:no-underline">
              <span className="flex items-center gap-2 text-muted-foreground">
                <mod.icon className="h-3.5 w-3.5" /> <span className="text-xs font-medium uppercase tracking-wide">{mod.module}</span>
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-0.5">
                {getActions(mod.module).map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleAddAction(action)}
                    className="block w-full text-left py-1.5 pl-6 pr-2 text-[0.8rem] text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-md transition-colors duration-150 cursor-pointer bg-transparent border-0"
                    title={action.description}
                  >
                    {action.title}
                    {action.requiresConnection && (
                      <span className="float-right inline-block w-1.5 h-1.5 rounded-full bg-accent mt-1.5" title="Requires internet connection" />
                    )}
                  </button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
