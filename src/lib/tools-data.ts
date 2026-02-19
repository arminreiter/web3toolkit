import { Code, Key, Link2, Wallet, type LucideIcon } from "lucide-react";
import { Module } from "./models/module";

export interface ToolAction {
  name: string;
  route: string;
  requiresConnection: boolean;
}

export interface ToolCategory {
  module: Module;
  icon: LucideIcon;
  actions: ToolAction[];
}

export const tools: ToolCategory[] = [
  {
    module: Module.KeyManagement,
    icon: Key,
    actions: [
      { name: "Seed Phrase Generator", route: "/tools/genseedphrase", requiresConnection: false },
      { name: "Key Pair Generator", route: "/tools/genkeypair", requiresConnection: false },
      { name: "Get Addresses from Seed Phrase", route: "/tools/getaddrfromseed", requiresConnection: false },
      { name: "Get Addresses from Private Key", route: "/tools/getaddrfromkey", requiresConnection: false },
      { name: "Get Address and Keys from Seed Phrase", route: "/tools/getaddrkeysfromseed", requiresConnection: false },
      { name: "Import Wallet from JSON", route: "/tools/importwallet", requiresConnection: false },
    ],
  },
  {
    module: Module.Wallet,
    icon: Wallet,
    actions: [
      { name: "Get Balances", route: "/tools/getbalances", requiresConnection: true },
      { name: "Get Balances per Block", route: "/tools/getbalancesperblock", requiresConnection: true },
      { name: "Drain Funds", route: "/tools/drainfunds", requiresConnection: true },
    ],
  },
  {
    module: Module.Blockchain,
    icon: Link2,
    actions: [
      { name: "Get Block", route: "/tools/getblock", requiresConnection: true },
      { name: "Get Transaction", route: "/tools/gettransaction", requiresConnection: true },
    ],
  },
  {
    module: Module.Utils,
    icon: Code,
    actions: [
      { name: "Is Valid Seed Phrase", route: "/tools/isvalidseed", requiresConnection: false },
      { name: "Is Valid Address", route: "/tools/isvalidaddress", requiresConnection: false },
      { name: "WeiConverter", route: "/tools/weiconverter", requiresConnection: false },
    ],
  },
];
