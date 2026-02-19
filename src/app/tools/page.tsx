'use client';

import Link from 'next/link';
import { ToolsData } from '@/lib/tools-data';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function ToolsOverview() {
  const tools = ToolsData.tools;

  return (
    <div className="stagger-children">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1">All Tools</h2>
        <p className="text-sm text-muted-foreground">Select a tool to get started</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Card key={tool.module} className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
                  <tool.icon className="h-4 w-4" />
                </div>
                <h5 className="font-semibold text-foreground">{tool.module}</h5>
              </div>
              <div className="h-px bg-gradient-to-r from-border via-border/50 to-transparent mb-3" />
              <div className="flex flex-col gap-0.5">
                {tool.actions.map((action) => (
                  <Link
                    key={action.route}
                    href={action.route}
                    className="group flex items-center justify-between py-1.5 px-2 -mx-2 text-sm text-muted-foreground no-underline hover:text-foreground hover:bg-secondary/30 rounded-md transition-colors duration-150"
                  >
                    <span>{action.name}</span>
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
