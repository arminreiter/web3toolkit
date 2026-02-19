'use client';

import Link from 'next/link';
import { ToolsData } from '@/lib/tools-data';
import { Card, CardContent } from '@/components/ui/card';

export default function ToolsOverview() {
  const tools = ToolsData.tools;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      {tools.map((tool) => (
        <div key={tool.module}>
          <Card className="border-accent h-full">
            <CardContent className="pt-6">
              <h5 className="font-semibold flex items-center gap-2">
                <tool.icon className="h-4 w-4" /> {tool.module}
              </h5>
              <hr className="border-border my-2" />
              {tool.actions.map((action) => (
                <div key={action.route}>
                  <Link href={action.route} className="block w-full m-3 text-left text-foreground no-underline hover:text-accent">
                    {action.name}
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
