'use client';

import Link from 'next/link';
import { Wrench, Bot, CircleHelp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="px-[15%]">
      <div className="p-6 text-center">
        <h1>
          <img src="/img/w3tk_logo.png" className="p-4 inline" style={{ height: '100px', width: 'auto' }} alt="Web3ToolKit" /> Web3ToolKit
        </h1>
        <hr className="border-border" />
      </div>

      <div className="px-6">
        <h2>...a toolkit for the web3</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
        <Link href="/tools" className="no-underline">
          <Card className="cursor-pointer h-full hover:border-accent transition-colors">
            <CardContent className="pt-6">
              <Wrench className="h-16 w-16 mx-auto mb-4" />
              <h5 className="text-foreground font-semibold">Tools</h5>
              <p className="text-muted-foreground">A set of easy to use tools. Generate a new seed phrase, get a block from the blockchain or convert wei to eth.</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/automator" className="no-underline">
          <Card className="cursor-pointer h-full hover:border-accent transition-colors">
            <CardContent className="pt-6">
              <Bot className="h-16 w-16 mx-auto mb-4" />
              <h5 className="text-foreground font-semibold">Automator</h5>
              <p className="text-muted-foreground">Allows you to add multiple operations to your flow and execute them in a row. You can e.g. generate a seed phrase, derive 20 private keys and get the public keys of each private key.</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/about" className="no-underline">
          <Card className="cursor-pointer h-full hover:border-accent transition-colors">
            <CardContent className="pt-6">
              <CircleHelp className="h-16 w-16 mx-auto mb-4" />
              <h5 className="text-foreground font-semibold">About</h5>
              <p className="text-muted-foreground">Want to know more about Web3Toolkit? Check out the about section.</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="p-6" />
      <hr className="border-border" />
      <div className="px-6">
        <p>This tool is still under development. More actions and features as well as responsiveness are planned for the future.</p>
        <p>You can contact me via: dev [at] w3tk.app</p>
      </div>
    </div>
  );
}
