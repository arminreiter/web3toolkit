import { faCode, faKey, faWallet } from "@fortawesome/free-solid-svg-icons";
import { Module } from "../shared/model/module";

export class ToolsData {
    public static tools = [
        { module: Module.KeyManagement, icon: faKey, actions: [ 
          { name: "Seed Phrase Generator", route: "/tools/genseedphrase", requiresConnection: false },
          { name: "Get Addresses from Seed Phrase", route: "/tools/getaddrfromseed", requiresConnection: false } 
        ] },
        { module: Module.Wallet,        icon: faWallet, actions: [ 
          { name: "Get Balances", route: "/tools/getbalances", requiresConnection: true } 
        ] },
        // { module: Module.Blockchain,    icon: faLink, actions: [ { name: "Seed Phrase Generator", route: "/tools/genseedphrase" } ] },
        { module: Module.Utils,         icon: faCode, actions: [ { name: "WeiConverter", route: "/tools/weiconverter", requiresConnection: false } ] }
    
      ];
      
}