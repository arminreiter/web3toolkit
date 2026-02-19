'use client';

import Link from 'next/link';
import { Wrench, Bot, CircleHelp, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    href: '/tools',
    icon: Wrench,
    title: 'Tools',
    description: 'Generate seed phrases, derive keys, check balances, convert wei, and more.',
    gradient: 'from-primary/20 to-primary/5',
    iconColor: 'text-primary',
  },
  {
    href: '/automator',
    icon: Bot,
    title: 'Automator',
    description: 'Chain operations together — generate seeds, derive keys, and get addresses in one flow.',
    gradient: 'from-accent/20 to-accent/5',
    iconColor: 'text-accent',
  },
  {
    href: '/about',
    icon: CircleHelp,
    title: 'About',
    description: 'Learn how Web3ToolKit works and explore sample workflows.',
    gradient: 'from-emerald-500/20 to-emerald-500/5',
    iconColor: 'text-emerald-400',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero section with mesh gradient */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 py-16 bg-mesh overflow-hidden">
        {/* Dot grid overlay */}
        <div className="absolute inset-0 bg-dot-grid opacity-30" />

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto text-center stagger-children">
          {/* Logo */}
          <div className="mb-8">
            <div className="inline-block relative">
              <img
                src="/img/w3tk_logo.png"
                className="h-20 w-auto mx-auto"
                alt="Web3ToolKit"
              />
              <div className="absolute inset-0 bg-primary/15 blur-3xl rounded-full scale-150" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            Web3
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_6s_ease_infinite]">
              ToolKit
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-12 leading-relaxed">
            A powerful suite of blockchain utilities for EVM-compatible chains.
            Keys, wallets, balances, and automation — all in your browser.
          </p>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {features.map((feature) => (
              <Link key={feature.href} href={feature.href} className="no-underline group">
                <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_30px_-8px_rgba(129,140,248,0.15)] overflow-hidden">
                  <CardContent className="pt-6 relative">
                    {/* Gradient blob */}
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${feature.gradient} rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-60`} />

                    <div className="relative">
                      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-secondary mb-4 ${feature.iconColor}`}>
                        <feature.icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-base font-semibold mb-2 text-foreground">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{feature.description}</p>
                      <div className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Explore <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6 px-6 text-center">
        <p className="text-sm text-muted-foreground">
          Open source blockchain toolkit. Contact: dev [at] w3tk.app
        </p>
      </footer>
    </div>
  );
}
