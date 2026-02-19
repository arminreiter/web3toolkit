'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Wrench, Bot, CircleHelp, type LucideIcon } from 'lucide-react';

const navItems: { href: string; icon: LucideIcon; label: string }[] = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/tools', icon: Wrench, label: 'Tools' },
  { href: '/automator', icon: Bot, label: 'Automator' },
  { href: '/about', icon: CircleHelp, label: 'About' },
];

export function Sidenav() {
  const pathname = usePathname();

  return (
    <nav className="w-[4.5rem] shrink-0 h-screen sticky top-0 flex flex-col bg-[#080d18] border-r border-border">
      {/* Logo */}
      <Link
        href="/"
        className="flex flex-col items-center justify-center py-4 text-foreground no-underline group"
        title="Web3ToolKit"
      >
        <div className="relative">
          <img
            src="/img/favicon.png"
            className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
            alt="Web3ToolKit"
          />
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <span className="text-[0.6rem] font-medium tracking-wider uppercase text-muted-foreground mt-1.5">W3TK</span>
      </Link>

      {/* Separator */}
      <div className="mx-3 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Nav items */}
      <ul className="flex flex-col gap-1 p-2 mt-2 list-none m-0">
        {navItems.map((item) => {
          const isActive = item.href === '/'
            ? pathname === '/'
            : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`relative flex flex-col items-center gap-1 py-2.5 px-1 rounded-lg text-center no-underline transition-all duration-200
                  ${isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                title={item.label}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-gradient-to-b from-primary to-accent" />
                )}
                <item.icon className="h-[18px] w-[18px]" strokeWidth={isActive ? 2.2 : 1.8} />
                <span className="text-[0.6rem] font-medium leading-none">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Spacer */}
      <div className="grow" />

      {/* Bottom accent line */}
      <div className="mx-3 mb-4 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </nav>
  );
}
