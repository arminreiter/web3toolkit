import { faCode, faKey } from "@fortawesome/free-solid-svg-icons";
import { Module } from "../shared/model/module";

export class ToolsData {
    public static tools = [
        { module: Module.KeyManagement, icon: faKey, actions: [ 
          { name: "Seed Phrase Generator", route: "/tools/genseedphrase" },
          { name: "Get Addresses from Seed Phrase", route: "/tools/getaddrfromseed"} 
        ] },
        // { module: Module.Wallet,        icon: faWallet, actions: [ { name: "Seed Phrase Generator", route: "/tools/genseedphrase" } ] },
        // { module: Module.Blockchain,    icon: faLink, actions: [ { name: "Seed Phrase Generator", route: "/tools/genseedphrase" } ] },
        { module: Module.Utils,         icon: faCode, actions: [ { name: "WeiConverter", route: "/tools/weiconverter" } ] }
    
      ];
      
}