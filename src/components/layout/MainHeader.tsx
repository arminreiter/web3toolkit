'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, ChevronDown, Globe } from 'lucide-react';
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

  return (
    <>
      <header className="flex items-center h-12 w-full border-b border-border bg-[#080d18]/80 backdrop-blur-sm px-4">
        {/* Network info */}
        <div className="flex items-center gap-3 flex-1">
          <div className="flex items-center gap-2">
            <div className="relative">
              <img
                src={network.imgUrl}
                className="h-6 w-6 rounded-full object-contain"
                alt={network.name}
              />
              <div className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 border border-[#080d18] animate-pulse-dot" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground leading-tight">{network.name}</span>
              <span className="text-[0.65rem] text-muted-foreground leading-tight">Connected</span>
            </div>
          </div>
        </div>

        {/* Network selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 border-border/60 bg-secondary/50 hover:bg-secondary text-sm">
              <Globe className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="hidden sm:inline">{network.name}</span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[240px]" align="end">
            <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Mainnets</DropdownMenuLabel>
            {mainnets.map((net) => (
              <DropdownMenuItem key={net.shortName} onClick={() => selectValue(net)}>
                <img src={net.imgUrl} className="h-5 w-5 rounded-full object-contain mr-2" alt={net.name} /> {net.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Testnets</DropdownMenuLabel>
            {testnets.map((net) => (
              <DropdownMenuItem key={net.shortName} onClick={() => selectValue(net)}>
                <img src={net.imgUrl} className="h-5 w-5 rounded-full object-contain mr-2" alt={net.name} /> {net.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Custom</DropdownMenuLabel>
            {custom.map((net, idx) => (
              <DropdownMenuItem key={`custom-${idx}`} onClick={() => selectValue(net)} className="flex justify-between">
                <span className="flex items-center">
                  <img src={net.imgUrl} className="h-5 w-5 rounded-full object-contain mr-2" alt={net.name} /> {net.name}
                </span>
                <Trash2
                  className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive transition-colors"
                  onClick={(e) => { e.stopPropagation(); deleteNetwork(net); }}
                />
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setShowModal(true)} className="text-primary">
              <Plus className="h-4 w-4 mr-2" /> Add Network
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Custom Network</DialogTitle>
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
            <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button onClick={addNetwork}>Add Network</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
