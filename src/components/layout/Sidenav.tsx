'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Wrench, Bot, CircleHelp, Menu, X, type LucideIcon } from 'lucide-react';

const navItems: { href: string; icon: LucideIcon; label: string }[] = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/tools', icon: Wrench, label: 'Tools' },
  { href: '/automator', icon: Bot, label: 'Automator' },
  { href: '/about', icon: CircleHelp, label: 'About' },
];

export function Sidenav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ── Mobile top bar ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-14 px-4 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <Link href="/" className="flex items-center gap-2.5 text-foreground no-underline">
          <Image src="/img/favicon.png" className="h-8 w-8" alt="Web3ToolKit" width={32} height={32} />
          <span className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">W3TK</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* ── Mobile overlay nav ── */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-md pt-14">
          <nav className="flex flex-col items-center justify-center h-full gap-3 p-6">
            {navItems.map((item) => {
              const isActive = item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-4 w-full max-w-xs py-4 px-6 rounded-xl text-center no-underline transition-all duration-200
                    ${isActive
                      ? 'text-primary bg-primary/10 border border-primary/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary border border-transparent'
                    }`}
                >
                  <item.icon className="h-6 w-6" strokeWidth={isActive ? 2.2 : 1.8} />
                  <span className="text-lg font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      {/* ── Desktop sidebar ── */}
      <nav className="hidden md:flex w-24 shrink-0 h-screen sticky top-0 flex-col bg-sidebar-background border-r border-border/50">
        {/* Logo */}
        <Link
          href="/"
          className="flex flex-col items-center justify-center py-6 text-foreground no-underline group"
          title="Web3ToolKit"
        >
          <div className="relative">
            <Image
              src="/img/favicon.png"
              className="h-10 w-10 transition-transform duration-300 group-hover:scale-110"
              alt="Web3ToolKit"
              width={40}
              height={40}
            />
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mt-2.5">W3TK</span>
        </Link>

        {/* Separator */}
        <div className="mx-5 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Nav items */}
        <ul className="flex flex-col gap-2 p-3 mt-3 list-none m-0">
          {navItems.map((item) => {
            const isActive = item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative flex flex-col items-center gap-1.5 py-3.5 px-2 rounded-lg text-center no-underline transition-all duration-200
                    ${isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }`}
                  title={item.label}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-7 rounded-full bg-primary" />
                  )}
                  <item.icon className="h-6 w-6" strokeWidth={isActive ? 2.2 : 1.8} />
                  <span className="text-xs font-medium leading-none">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Spacer */}
        <div className="grow" />

        {/* Bottom accent line */}
        <div className="mx-5 mb-5 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </nav>
    </>
  );
}
