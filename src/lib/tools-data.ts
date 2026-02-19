import { Code, Key, Wallet, type LucideIcon } from "lucide-react";
import { Module } from "./models/module";

export class ToolsData {
    public static tools: { module: Module; icon: LucideIcon; actions: { name: string; route: string; requiresConnection: boolean }[] }[] = [
        { module: Module.KeyManagement, icon: Key, actions: [
          { name: "Seed Phrase Generator", route: "/tools/genseedphrase", requiresConnection: false },
          { name: "Key Pair Generator", route: "/tools/genkeypair", requiresConnection: false },
          { name: "Get Addresses from Seed Phrase", route: "/tools/getaddrfromseed", requiresConnection: false } ,
          { name: "Get Addresses from Private Key", route: "/tools/getaddrfromkey", requiresConnection: false } ,
          { name: "Get Address and Keys from Seed Phrase", route: "/tools/getaddrkeysfromseed", requiresConnection: false}
        ] },
        { module: Module.Wallet,        icon: Wallet, actions: [
          { name: "Get Balances", route: "/tools/getbalances", requiresConnection: true },
          { name: "Get Balances per Block", route: "/tools/getbalancesperblock", requiresConnection: true },
          { name: "Drain Funds", route: "/tools/drainfunds", requiresConnection: true}
        ] },
        { module: Module.Utils,         icon: Code, actions: [
          { name: "Is Valid Seed Phrase", route: "/tools/isvalidseed", requiresConnection: false },
          { name: "Is Valid Address", route: "/tools/isvalidaddress", requiresConnection: false },
          { name: "WeiConverter", route: "/tools/weiconverter", requiresConnection: false }
        ] }

      ];

}
