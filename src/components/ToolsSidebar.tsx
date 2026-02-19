'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ToolsData } from '@/lib/tools-data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function ToolsSidebar() {
  const pathname = usePathname();
  const tools = ToolsData.tools;

  return (
    <div className="px-3 pt-4 text-foreground h-full flex flex-col bg-[#080d18]">
      <Link href="/tools" className="no-underline">
        <div className="text-xs uppercase tracking-widest text-center text-muted-foreground font-medium mb-1">Tools</div>
      </Link>
      <div className="mx-2 h-px bg-gradient-to-r from-transparent via-border to-transparent mb-2" />
      <Accordion type="multiple" defaultValue={tools.map((t) => t.module)} className="grow overflow-y-auto">
        {tools.map((tool) => (
          <AccordionItem key={tool.module} value={tool.module} className="border-border/50">
            <AccordionTrigger className="py-2 text-sm hover:no-underline">
              <span className="flex items-center gap-2 text-muted-foreground">
                <tool.icon className="h-3.5 w-3.5" /> <span className="text-xs font-medium uppercase tracking-wide">{tool.module}</span>
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-0.5">
                {tool.actions.map((action) => (
                  <Link
                    key={action.route}
                    href={action.route}
                    className={`block w-full text-left py-1.5 pl-6 pr-2 text-[0.8rem] no-underline rounded-md transition-colors duration-150
                      ${pathname === action.route
                        ? 'text-primary bg-primary/10 font-medium'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                      }`}
                    title={action.name}
                  >
                    {action.name}
                    {action.requiresConnection && (
                      <span className="float-right inline-block w-1.5 h-1.5 rounded-full bg-accent mt-1.5" title="Requires internet connection" />
                    )}
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
