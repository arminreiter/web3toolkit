export class Network {
    constructor(public shortName:string, public name: string, public rpcUrl: string, public imgUrl: string, public chainId?: number, public type: string = "main") {
    }

    private static Networks: Network[] = [
        new Network("avax-main", "Avalanche", "https://api.avax.network/ext/bc/C/rpc", "assets/img/avalanche_avax_logo.svg", 43114),
        new Network("ecs-main", "eCredits", "https://rpc.ecredits.com", "assets/img/eCredits_logo.png", 63000),
        new Network("eth-main", "Ethereum", "https://cloudflare-eth.com", "assets/img/ethereum_logo.webp"),
        new Network("gns-main", "Gnosis", "https://rpc.gnosischain.com", "assets/img/gnosis_logo.png", 100),
        new Network("poly-main", "Polygon", "https://polygon.llamarpc.com", "assets/img/polygon_matic_logo.svg", 137),
        new Network("avax-test", "Avalanche Fuji Testnet", "https://api.avax-test.network/ext/bc/C/rpc", "assets/img/avalanche_avax_logo.svg", 43113, "test"),
        new Network("ecs-test", "eCredits Testnet", "https://rpc.tst.ecredits.com", "assets/img/eCredits_logo.png", 63001, "test"),
        new Network("eth-rinkeby", "Ethereum Rinkeby", "https://rinkeby-light.eth.linkpool.io/", "assets/img/ethereum_logo.webp", 4, "test"),
        new Network("gns-test", "Gnosis Chiado Testnet", "https://rpc.chiadochain.net", "assets/img/gnosis_logo.png", 10200, "test"),
        new Network("poly-test", "Polygon Mumbai Testnet", "https://polygon-mumbai.gateway.tenderly.co", "assets/img/polygon_matic_logo.svg", 80001, "test"),
    ];

    private static CustomNetworks: Network[] = [ ];

    public static getNetworks(type: string = "") : Network[] {
        var cust = localStorage.getItem("customNetworks");
        if (cust != null)
        {
            var custom = atob(cust);
            Network.CustomNetworks = JSON.parse(custom);
        }
        if(type.length > 0) {
            return this.Networks.concat(this.CustomNetworks).filter(net => net.type == type);
        }
        return this.Networks.concat(this.CustomNetworks);
    }

    public static getNetwork(name: string) : Network | undefined {
        name = name.toLowerCase();
        var net = Network.Networks.find(x => x.shortName.toLowerCase() == name);
        if(net) return net;

        net = Network.Networks.find(x => x.name.toLowerCase() == name);
        if(net) return net;
        
        net = Network.Networks.find(x => x.shortName.toLowerCase() == name + "-main");
        if(net) return net;

        return net;
    }

    public static addCustomNetwork(name: string, rpc: string, chainId: number) : boolean {
        var exists = this.CustomNetworks.findIndex(e => e.name == name && e.rpcUrl == rpc && e.chainId == chainId);
        if(exists != -1) {
            return false;
        }
        this.CustomNetworks.push(
            new Network("cst", name, rpc, "assets/img/w3tk_logo.png", chainId, "custom")
        );

        localStorage.setItem("customNetworks", btoa(JSON.stringify(this.CustomNetworks)));
        return true;
    }
    public static removeCustomNetwork(net: Network) {
        this.CustomNetworks = this.CustomNetworks.filter(element => element.name != net.name && element.chainId != net.chainId && element.rpcUrl != net.rpcUrl);

        localStorage.setItem("customNetworks", btoa(JSON.stringify(this.CustomNetworks)));
    }
}