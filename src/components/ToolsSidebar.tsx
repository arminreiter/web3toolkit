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
    <div className="px-3 pt-3 text-foreground h-full flex flex-col">
      <div className="whitespace-nowrap text-center">
        <Link href="/tools" className="text-foreground no-underline">Tools</Link>
      </div>
      <hr className="border-border my-2" />
      <Accordion type="multiple" defaultValue={tools.map((t) => t.module)} className="grow overflow-y-auto">
        {tools.map((tool) => (
          <AccordionItem key={tool.module} value={tool.module}>
            <AccordionTrigger className="py-1 text-sm">
              <span className="flex items-center gap-2">
                <tool.icon className="h-4 w-4" /> {tool.module}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              {tool.actions.map((action) => (
                <Link
                  key={action.route}
                  href={action.route}
                  className={`block w-full text-left py-1 pl-6 text-sm no-underline ${pathname === action.route ? 'text-accent' : 'text-foreground'} hover:text-accent`}
                  title={action.name}
                >
                  {action.name}
                  {action.requiresConnection && (
                    <img src="/img/circle.svg" className="p-2 float-right" title="This action requires an active internet connection." alt="requires connection" />
                  )}
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
