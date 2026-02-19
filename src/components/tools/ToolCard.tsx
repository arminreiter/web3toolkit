'use client';

import { Card, CardContent } from '@/components/ui/card';

interface ToolCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function ToolCard({ title, description, children }: ToolCardProps) {
  return (
    <Card className="border-border/40 bg-card/70 backdrop-blur-sm card-hover-glow">
      <CardContent className="pt-5 pb-6 space-y-6">
        <div>
          <h3 className="text-2xl font-semibold mb-2">{title}</h3>
          <p className="text-base text-muted-foreground leading-relaxed">{description}</p>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}
