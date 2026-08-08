'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FlaskConical, ExternalLink } from 'lucide-react';

import { useAppStore } from '@/lib/store';
import { Actions } from '@/lib/actions/actions';
import { GetBalance } from '@/lib/actions/getBalance';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// ponytail: inline SVG — lucide-react removed brand icons; single usage, not worth a dependency
function Github(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function AboutPage() {
  const router = useRouter();
  const store = useAppStore();

  const addressGeneration = () => {
    useAppStore.setState({ actions: [], input: '' });
    store.addAction(Actions.genSeedPhraseAction());
    store.addAction(Actions.derivePrivateKeys());
    store.addAction(Actions.getAddressesFromPrivateKeys());
    router.push('/automator');
  };

  const balanceReport = () => {
    useAppStore.setState({ actions: [], input: '0x0000000000000000000000000000000000000000' });
    store.addAction(new GetBalance());
    router.push('/automator');
  };

  return (
    <div className="h-full overflow-y-auto bg-mesh">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-8 sm:py-10 stagger-children">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-1.5">About</h1>
          <p className="text-base text-muted-foreground">Learn about Web3ToolKit and try sample workflows</p>
        </div>

        {/* Hero card */}
        <Card className="border-border/40 bg-card/70 backdrop-blur-sm mb-8 overflow-hidden">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-center">
              <div className="text-center md:text-left">
                <div className="relative inline-block">
                  <Image src="/img/w3tk_logo.png" width={512} height={448} className="h-40 w-auto" alt="Web3ToolKit" priority />
                  <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-150" />
                </div>
              </div>
              <div>
                <p className="text-base text-muted-foreground leading-relaxed mb-4">
                  Web3ToolKit is an open-source tool that helps interact with the web3. Connect to different EVM networks and
                  perform actions like generating seed phrases, deriving private keys and public addresses, or checking address validity. Most operations work offline.
                  Actions that require an internet connection are marked with
                  <span className="inline-block w-2 h-2 rounded-full bg-accent mx-1.5 align-middle" />.
                </p>
                <div className="flex flex-wrap gap-2">
                  <a href="https://github.com/arminreiter/web3toolkit" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Github className="h-4 w-4" />
                      View source code
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Avalanche-specific toolkit */}
        <Card className="border-border/40 bg-card/70 backdrop-blur-sm mb-8 overflow-hidden">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Image src="/img/avalanche_avax_logo.svg" width={48} height={48} className="h-12 w-12 shrink-0" alt="Avalanche" />
              <div className="flex-1">
                <h4 className="text-lg font-semibold mb-1 text-foreground">Toolkit for Avalanche</h4>
                <p className="text-base text-muted-foreground leading-relaxed">
                  A dedicated toolkit is available for Avalanche with additional Avalanche-specific tools and utilities.
                </p>
              </div>
              <a href="https://avaxtoolkit.com" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-2">
                  Visit avaxtoolkit.com
                  <ExternalLink className="h-3 w-3 text-muted-foreground" />
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Sample workflows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Address Generation */}
          <Card className="border-border/40 bg-card/70 backdrop-blur-sm group hover:border-primary/30 transition-colors duration-300">
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold mb-3 text-foreground">Address Generation</h2>
              <ol className="text-base text-muted-foreground space-y-2 mb-4 list-decimal list-inside">
                <li>Generate Seed Phrase</li>
                <li>Derive Private Keys</li>
                <li>Get Public Addresses</li>
              </ol>
              <Image src="/img/screenshots/scr1.png" width={1994} height={1103} className="w-full h-auto rounded-lg border border-border/50 mb-4 opacity-80 group-hover:opacity-100 transition-opacity duration-300" alt="Address Generation" />
              <Button onClick={addressGeneration} size="sm" className="w-full gap-2">
                <FlaskConical className="h-4 w-4" /> Try it out
              </Button>
            </CardContent>
          </Card>

          {/* Balance Report */}
          <Card className="border-border/40 bg-card/70 backdrop-blur-sm group hover:border-accent/30 transition-colors duration-300">
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold mb-3 text-foreground">Balance Report</h2>
              <ol className="text-base text-muted-foreground space-y-2 mb-4 list-decimal list-inside">
                <li>Select your network</li>
                <li>Add addresses to input</li>
                <li>Execute Get Balance</li>
              </ol>
              <Image src="/img/screenshots/scr2.png" width={1993} height={1062} className="w-full h-auto rounded-lg border border-border/50 mb-4 opacity-80 group-hover:opacity-100 transition-opacity duration-300" alt="Balance Report" />
              <Button onClick={balanceReport} size="sm" variant="outline" className="w-full gap-2">
                <FlaskConical className="h-4 w-4" /> Try it out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
