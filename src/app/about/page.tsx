'use client';

import { useRouter } from 'next/navigation';
import { FlaskConical } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Actions } from '@/lib/actions/actions';
import { GetBalance } from '@/lib/actions/getBalance';
import { Button } from '@/components/ui/button';

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
    <div className="h-full px-[15%] overflow-y-auto">
      <div className="border-b border-border pt-6 pb-0">
        <h3>About</h3>
      </div>
      <div className="grid grid-cols-2 gap-4 pt-6">
        <div className="text-center">
          <img src="/img/w3tk_logo.png" className="p-4 inline" style={{ height: '280px', width: 'auto' }} alt="Web3ToolKit" />
        </div>
        <div>
          <p>
            Web3ToolKit is an open-source tool that helps to interact with the web3. It allows to connect to different EVM networks and
            supports multiple actions such as generating a seed phrase, deriving private keys and public addresses or to check if an address is valid. It
            mostly works offline. Every action that requires an active internet connection is marked <img src="/img/circle.svg" alt="connection required" /> as such.
          </p>
          <p>Source code is available on github:</p>
          <a href="https://github.com/arminreiter/web3toolkit" target="_blank" rel="noopener noreferrer">
            <Button variant="secondary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" className="fill-current">
                <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z" />
              </svg>
              {' '}View source code
            </Button>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="border-b border-border pt-6 pb-2">Sample: Address Generation</h4>
          <ul>
            <li>Generate Seed Phrase</li>
            <li>Get Private Keys</li>
            <li>Generate Public Addresses from Key(s)</li>
          </ul>
          <div className="text-center p-1 pt-2">
            <Button onClick={addressGeneration} className="min-w-[160px]">
              <FlaskConical className="h-4 w-4 mr-2" /> Try out!
            </Button>
          </div>
        </div>
        <div>
          <img src="/img/screenshots/scr1.jpg" className="p-2 w-full" alt="Address Generation Screenshot" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <img src="/img/screenshots/scr2.jpg" className="p-2 w-full" alt="Balance Report Screenshot" />
        </div>
        <div>
          <h4 className="border-b border-border pt-6 pb-2">Sample: Balance Report</h4>
          <ul>
            <li>Select your network (Ethereum, Gnosis, ...)</li>
            <li>Add your addresses to input</li>
            <li>Execute Get Balance action</li>
          </ul>
          <div className="text-center p-1 pt-2">
            <Button onClick={balanceReport} className="min-w-[160px]">
              <FlaskConical className="h-4 w-4 mr-2" /> Try out!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
