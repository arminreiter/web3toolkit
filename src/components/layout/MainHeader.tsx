'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Network } from '@/lib/models/network';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const networkColorMap: Record<string, string> = {
  'avax-main': 'bg-[#171818]',
  'avax-test': 'bg-[#171818]',
  'eth-main': 'bg-background',
  'eth-rinkeby': 'bg-background',
  'ecs-main': 'bg-[#278DE1]',
  'ecs-test': 'bg-[#278DE1]',
  'gns-main': 'bg-[#04795B]',
  'gns-test': 'bg-[#04795B]',
  'poly-main': 'bg-[#120c1b]',
  'poly-test': 'bg-[#120c1b]',
  'cst': 'bg-background',
};

export function MainHeader() {
  const network = useAppStore((s) => s.network);
  const setNetwork = useAppStore((s) => s.setNetwork);

  const [mainnets, setMainnets] = useState<Network[]>([]);
  const [testnets, setTestnets] = useState<Network[]>([]);
  const [custom, setCustom] = useState<Network[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [cstName, setCstName] = useState('localhost');
  const [cstRpc, setCstRpc] = useState('http://localhost:8454');
  const [cstChainId, setCstChainId] = useState(1337);

  useEffect(() => {
    setMainnets(Network.getNetworks('main'));
    setTestnets(Network.getNetworks('test'));
    setCustom(Network.getNetworks('custom'));
  }, []);

  const selectValue = (net: Network) => {
    setNetwork(net);
  };

  const addNetwork = () => {
    const result = Network.addCustomNetwork(cstName, cstRpc, cstChainId);
    if (!result) {
      alert('Network already exists!');
    }
    setCustom(Network.getNetworks('custom'));
    setShowModal(false);
  };

  const deleteNetwork = (net: Network) => {
    Network.removeCustomNetwork(net);
    setCustom(Network.getNetworks('custom'));
  };

  const bgClass = networkColorMap[network.shortName] || 'bg-background';

  return (
    <>
      <div className={`flex items-center h-[52px] w-full ${bgClass}`}>
        <div className="flex-1 px-3 text-white flex items-center">
          <img src={network.imgUrl} style={{ height: '32px' }} alt={network.name} />
          <span className="pl-3" style={{ fontSize: 'large', verticalAlign: '-0.15rem' }}>{network.name}</span>
        </div>
        <div className="py-1 pr-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full min-w-[180px]">
                {network.name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[240px]">
              <DropdownMenuLabel>Mainnets</DropdownMenuLabel>
              {mainnets.map((net) => (
                <DropdownMenuItem key={net.shortName} onClick={() => selectValue(net)}>
                  <img src={net.imgUrl} className="m-1 object-contain w-6 h-7 pr-[3px]" alt={net.name} /> {net.name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Testnets</DropdownMenuLabel>
              {testnets.map((net) => (
                <DropdownMenuItem key={net.shortName} onClick={() => selectValue(net)}>
                  <img src={net.imgUrl} className="m-1 object-contain w-6 h-7 pr-[3px]" alt={net.name} /> {net.name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Custom Networks</DropdownMenuLabel>
              {custom.map((net, idx) => (
                <DropdownMenuItem key={`custom-${idx}`} onClick={() => selectValue(net)} className="flex justify-between">
                  <span className="flex items-center">
                    <img src={net.imgUrl} className="m-1 object-contain w-6 h-7 pr-[3px]" alt={net.name} /> {net.name}
                  </span>
                  <Trash2
                    className="h-4 w-4 text-muted-foreground hover:text-destructive"
                    onClick={(e) => { e.stopPropagation(); deleteNetwork(net); }}
                  />
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowModal(true)}>
                <Plus className="h-4 w-4 mr-2" /> Add New
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Custom Network</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Network Name</Label>
              <Input value={cstName} onChange={(e) => setCstName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>RPC URL</Label>
              <Input value={cstRpc} onChange={(e) => setCstRpc(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Chain ID</Label>
              <Input type="number" min={0} value={cstChainId} onChange={(e) => setCstChainId(Number(e.target.value))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)}>Close</Button>
            <Button onClick={addNetwork}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
