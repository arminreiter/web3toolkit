'use client';

import { useRouter } from 'next/navigation';
import { FlaskConical, Github, ExternalLink } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Actions } from '@/lib/actions/actions';
import { GetBalance } from '@/lib/actions/getBalance';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
      <div className="max-w-4xl mx-auto px-8 py-8 stagger-children">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-1">About</h2>
          <p className="text-sm text-muted-foreground">Learn about Web3ToolKit and try sample workflows</p>
        </div>

        {/* Hero card */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm mb-8 overflow-hidden">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-center">
              <div className="text-center md:text-left">
                <div className="relative inline-block">
                  <img src="/img/w3tk_logo.png" className="h-40 w-auto" alt="Web3ToolKit" />
                  <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-150" />
                </div>
              </div>
              <div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Web3ToolKit is an open-source tool that helps interact with the web3. Connect to different EVM networks and
                  perform actions like generating seed phrases, deriving private keys and public addresses, or checking address validity. Most operations work offline.
                  Actions that require an internet connection are marked with
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mx-1.5 align-middle" />.
                </p>
                <a href="https://github.com/arminreiter/web3toolkit" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Github className="h-4 w-4" />
                    View source code
                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                  </Button>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sample workflows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Address Generation */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm group hover:border-primary/30 transition-colors duration-300">
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-3 text-foreground">Address Generation</h4>
              <ol className="text-sm text-muted-foreground space-y-1.5 mb-4 list-decimal list-inside">
                <li>Generate Seed Phrase</li>
                <li>Derive Private Keys</li>
                <li>Get Public Addresses</li>
              </ol>
              <img src="/img/screenshots/scr1.jpg" className="w-full rounded-lg border border-border/50 mb-4 opacity-80 group-hover:opacity-100 transition-opacity duration-300" alt="Address Generation" />
              <Button onClick={addressGeneration} size="sm" className="w-full gap-2">
                <FlaskConical className="h-4 w-4" /> Try it out
              </Button>
            </CardContent>
          </Card>

          {/* Balance Report */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm group hover:border-accent/30 transition-colors duration-300">
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-3 text-foreground">Balance Report</h4>
              <ol className="text-sm text-muted-foreground space-y-1.5 mb-4 list-decimal list-inside">
                <li>Select your network</li>
                <li>Add addresses to input</li>
                <li>Execute Get Balance</li>
              </ol>
              <img src="/img/screenshots/scr2.jpg" className="w-full rounded-lg border border-border/50 mb-4 opacity-80 group-hover:opacity-100 transition-opacity duration-300" alt="Balance Report" />
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
