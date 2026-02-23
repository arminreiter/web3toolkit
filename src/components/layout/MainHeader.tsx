'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus, Trash2, Pencil, ChevronDown, PanelLeft } from 'lucide-react';
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

interface MainHeaderProps {
  onToggleSidebar?: () => void;
  showSidebarToggle?: boolean;
}

export function MainHeader({ onToggleSidebar, showSidebarToggle }: MainHeaderProps) {
  const network = useAppStore((s) => s.network);
  const setNetwork = useAppStore((s) => s.setNetwork);

  const [mainnets] = useState(() => Network.getNetworks('main'));
  const [testnets] = useState(() => Network.getNetworks('test'));
  const [custom, setCustom] = useState(() => Network.getNetworks('custom'));
  const [showModal, setShowModal] = useState(false);
  const [editingNetwork, setEditingNetwork] = useState<Network | null>(null);
  const [cstName, setCstName] = useState('');
  const [cstRpc, setCstRpc] = useState('http://127.0.0.1:8545');
  const [cstChainId, setCstChainId] = useState(8454);

  const openAddModal = () => {
    setEditingNetwork(null);
    setCstName('localhost');
    setCstRpc('http://127.0.0.1:8545');
    setCstChainId(1337);
    setShowModal(true);
  };

  const openEditModal = (net: Network) => {
    setEditingNetwork(net);
    setCstName(net.name);
    setCstRpc(net.rpcUrl);
    setCstChainId(net.chainId ?? 0);
    setShowModal(true);
  };

  const saveNetwork = () => {
    if (editingNetwork) {
      Network.updateCustomNetwork(editingNetwork, cstName, cstRpc, cstChainId);
    } else {
      const result = Network.addCustomNetwork(cstName, cstRpc, cstChainId);
      if (!result) {
        alert('Network already exists!');
        return;
      }
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
      <header className="flex items-center h-16 w-full border-b border-border/50 bg-background/80 backdrop-blur-sm px-5 sm:px-6 gap-4">
        {/* Sidebar toggle for mobile */}
        {showSidebarToggle && (
          <button
            onClick={onToggleSidebar}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors shrink-0"
            aria-label="Toggle tools sidebar"
          >
            <PanelLeft className="h-5 w-5" />
          </button>
        )}

        {/* Network info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <Image
                src={network.imgUrl}
                className="h-8 w-8 rounded-full object-contain"
                alt={network.name}
                width={32}
                height={32}
              />
              <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-background animate-pulse-dot" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-base font-semibold text-foreground leading-tight truncate">{network.name}</span>
              <span className="text-sm text-muted-foreground leading-tight">Connected</span>
            </div>
          </div>
        </div>

        {/* Network selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="lg" className="gap-2.5 border-border/60 bg-secondary/50 hover:bg-secondary shrink-0">
              <Image src={network.imgUrl} className="h-5 w-5 rounded-full object-contain" alt={network.name} width={20} height={20} />
              <span className="hidden sm:inline text-sm">{network.name}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[260px]" align="end">
            <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Mainnets</DropdownMenuLabel>
            {mainnets.map((net) => (
              <DropdownMenuItem key={net.shortName} onClick={() => setNetwork(net)} className="py-2.5">
                <Image src={net.imgUrl} className="h-5 w-5 rounded-full object-contain mr-2.5" alt={net.name} width={20} height={20} /> {net.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Testnets</DropdownMenuLabel>
            {testnets.map((net) => (
              <DropdownMenuItem key={net.shortName} onClick={() => setNetwork(net)} className="py-2.5">
                <Image src={net.imgUrl} className="h-5 w-5 rounded-full object-contain mr-2.5" alt={net.name} width={20} height={20} /> {net.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Custom</DropdownMenuLabel>
            {custom.map((net, idx) => (
              <DropdownMenuItem key={`custom-${idx}`} onClick={() => setNetwork(net)} className="flex justify-between py-2.5">
                <span className="flex items-center">
                  <Image src={net.imgUrl} className="h-5 w-5 rounded-full object-contain mr-2.5" alt={net.name} width={20} height={20} /> {net.name}
                </span>
                <span className="flex items-center gap-1">
                  <button
                    className="p-1 rounded hover:bg-secondary transition-colors"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => { e.stopPropagation(); openEditModal(net); }}
                  >
                    <Pencil className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground transition-colors" />
                  </button>
                  <button
                    className="p-1 rounded hover:bg-secondary transition-colors"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => { e.stopPropagation(); deleteNetwork(net); }}
                  >
                    <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive transition-colors" />
                  </button>
                </span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={openAddModal} className="text-primary py-2.5">
              <Plus className="h-4 w-4 mr-2.5" /> Add Network
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingNetwork ? 'Edit Custom Network' : 'Add Custom Network'}</DialogTitle>
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
            <Button onClick={saveNetwork}>{editingNetwork ? 'Save' : 'Add Network'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
