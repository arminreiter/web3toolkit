import Image from 'next/image';
import Link from 'next/link';
import { Wrench, Bot, CircleHelp, ArrowRight } from 'lucide-react';

const features = [
  {
    href: '/tools',
    icon: Wrench,
    title: 'Tools',
    description: 'Generate seed phrases, derive keys, check balances, convert wei, and more.',
    accentColor: 'rgba(13, 202, 240, 0.5)',
    iconColor: 'text-primary',
    borderHover: 'hover:border-primary/30',
  },
  {
    href: '/automator',
    icon: Bot,
    title: 'Automator',
    description: 'Chain operations together — generate seeds, derive keys, and get addresses in one flow.',
    accentColor: 'rgba(13, 202, 240, 0.5)',
    iconColor: 'text-primary',
    borderHover: 'hover:border-primary/30',
  },
  {
    href: '/about',
    icon: CircleHelp,
    title: 'About',
    description: 'Learn how Web3ToolKit works and explore sample workflows.',
    accentColor: 'rgba(13, 202, 240, 0.5)',
    iconColor: 'text-primary',
    borderHover: 'hover:border-primary/30',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col noise-overlay">
      {/* Hero section */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-5 sm:px-8 py-16 sm:py-24 overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-mesh" />
        <div className="absolute inset-0 bg-dot-grid opacity-20" />

        {/* Radial spotlight from center */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px]" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center stagger-children">
          {/* Logo */}
          <div className="mb-10 sm:mb-12">
            <div className="inline-block relative">
              <Image
                src="/img/w3tk_logo.png"
                className="h-20 sm:h-28 w-auto mx-auto relative z-10"
                alt="Web3ToolKit"
                width={112}
                height={112}
              />
              <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full scale-[2]" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6">
            Web3
            <span className="text-primary">
              ToolKit
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-xl mx-auto mb-14 sm:mb-18 leading-relaxed">
            Blockchain utilities for EVM-compatible chains.
            Keys, wallets, balances, and automation — all in your browser.
          </p>

          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-7 text-left">
            {features.map((feature) => (
              <Link key={feature.href} href={feature.href} className="no-underline group">
                <div className={`h-full rounded-xl border border-border/40 bg-card/60 backdrop-blur-sm p-8 transition-all duration-400 ${feature.borderHover} card-hover-glow overflow-hidden relative`}>
                  {/* Top accent glow */}
                  <div
                    className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-[50px] opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                    style={{ background: feature.accentColor }}
                  />

                  <div className="relative">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/80 mb-5 ${feature.iconColor}`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h2 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h2>
                    <p className="text-base text-muted-foreground leading-relaxed mb-6">{feature.description}</p>
                    <div className="flex items-center gap-2 text-base font-medium text-primary opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300">
                      Explore <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/30 py-7 px-6 text-center">
        <p className="text-sm text-muted-foreground/70">
          Open source blockchain toolkit &middot; dev [at] w3tk.app
        </p>
      </footer>
    </div>
  );
}
