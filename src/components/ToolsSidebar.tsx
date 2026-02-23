'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { tools } from '@/lib/tools-data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function ToolsSidebar({ hideHeader }: { hideHeader?: boolean }) {
  const pathname = usePathname();

  return (
    <div className="px-4 pt-5 text-foreground h-full flex flex-col bg-sidebar-background">
      {!hideHeader && (
        <>
          <Link href="/tools" className="no-underline">
            <div className="text-sm uppercase tracking-widest text-center text-muted-foreground font-semibold mb-2">Tools</div>
          </Link>
          <div className="mx-2 h-px bg-gradient-to-r from-transparent via-border to-transparent mb-3" />
        </>
      )}
      <Accordion type="multiple" defaultValue={tools.map((t) => t.module)} className="grow overflow-y-auto">
        {tools.map((tool) => (
          <AccordionItem key={tool.module} value={tool.module} className="border-border/50">
            <AccordionTrigger className="py-3 hover:no-underline">
              <span className="flex items-center gap-2.5 text-muted-foreground">
                <tool.icon className="h-[18px] w-[18px]" /> <span className="text-sm font-semibold uppercase tracking-wide">{tool.module}</span>
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-0.5">
                {tool.actions.map((action) => (
                  <Link
                    key={action.route}
                    href={action.route}
                    className={`block w-full text-left py-2.5 pl-7 pr-3 text-[15px] no-underline rounded-md transition-colors duration-150
                      ${pathname === action.route
                        ? 'text-primary bg-primary/10 font-medium'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                      }`}
                    title={action.name}
                  >
                    {action.name}
                    {action.requiresConnection && (
                      <span className="float-right inline-block w-1.5 h-1.5 rounded-full bg-accent mt-2.5" title="Requires internet connection" />
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
