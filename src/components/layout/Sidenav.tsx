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
    <div className="flex flex-col shrink-0 h-full">
      <Link
        href="/"
        className="block pb-4 pt-2 text-center border-b border-border text-foreground no-underline"
        title="web3toolkit"
        style={{ fontSize: '0.75rem' }}
      >
        <img src="/img/favicon.png" className="mb-2" style={{ height: '36px' }} alt="Web3ToolKit" />
        <br />
        <span className="font-bold">Web3ToolKit</span>
      </Link>
      <ul className="flex flex-col mb-auto text-center list-none p-0 m-0">
        {navItems.map((item) => {
          const isActive = item.href === '/'
            ? pathname === '/'
            : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block py-3 border-b border-border text-foreground no-underline hover:text-accent ${isActive ? 'text-accent' : ''}`}
                title={item.label}
              >
                <item.icon className="h-4 w-4 mx-auto" />
                <br />
                <span style={{ fontSize: '0.75rem' }}>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
