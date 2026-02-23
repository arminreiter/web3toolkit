'use client';

import Link from 'next/link';
import { tools } from '@/lib/tools-data';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function ToolsOverview() {

  return (
    <div className="stagger-children">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Card key={tool.module} className="border-border/40 bg-card/70 backdrop-blur-sm py-0">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                  <tool.icon className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">{tool.module}</h2>
              </div>
              <div className="h-px bg-gradient-to-r from-border via-border/50 to-transparent mb-2" />
              <div className="flex flex-col gap-0.5">
                {tool.actions.map((action) => (
                  <Link
                    key={action.route}
                    href={action.route}
                    className="group flex items-center justify-between py-2.5 px-3 -mx-3 text-base text-muted-foreground no-underline hover:text-foreground hover:bg-secondary/30 rounded-md transition-colors duration-150"
                  >
                    <span>{action.name}</span>
                    <ArrowRight className="h-4 w-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
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
