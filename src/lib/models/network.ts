export class Network {
    constructor(public shortName:string, public name: string, public rpcUrl: string, public imgUrl: string, public chainId?: number, public type: string = "main") {
    }

    private static Networks: Network[] = [
        new Network("arb-main", "Arbitrum", "https://arb1.arbitrum.io/rpc", "/img/arbitrum_logo.png", 42161),
        new Network("avax-main", "Avalanche", "https://api.avax.network/ext/bc/C/rpc", "/img/avalanche_avax_logo.svg", 43114),
        new Network("base-main", "Base", "https://mainnet.base.org", "/img/base_logo.png", 8453),
        new Network("bnb-main", "BNB Chain", "https://bsc-dataseed.binance.org", "/img/bnb_logo.png", 56),
        new Network("eth-main", "Ethereum", "https://cloudflare-eth.com", "/img/ethereum_logo.webp", 1),
        new Network("gns-main", "Gnosis", "https://rpc.gnosischain.com", "/img/gnosis_logo.png", 100),
        new Network("op-main", "Optimism", "https://mainnet.optimism.io", "/img/optimism_logo.png", 10),
        new Network("poly-main", "Polygon", "https://polygon.llamarpc.com", "/img/polygon_matic_logo.svg", 137),
        new Network("arb-test", "Arbitrum Sepolia", "https://sepolia-rollup.arbitrum.io/rpc", "/img/arbitrum_logo.png", 421614, "test"),
        new Network("avax-test", "Avalanche Fuji Testnet", "https://api.avax-test.network/ext/bc/C/rpc", "/img/avalanche_avax_logo.svg", 43113, "test"),
        new Network("base-test", "Base Sepolia", "https://sepolia.base.org", "/img/base_logo.png", 84532, "test"),
        new Network("bnb-test", "BNB Testnet", "https://data-seed-prebsc-1-s1.binance.org:8545", "/img/bnb_logo.png", 97, "test"),
        new Network("eth-test", "Ethereum Sepolia", "https://rpc.sepolia.org", "/img/ethereum_logo.webp", 11155111, "test"),
        new Network("gns-test", "Gnosis Chiado Testnet", "https://rpc.chiadochain.net", "/img/gnosis_logo.png", 10200, "test"),
        new Network("op-test", "Optimism Sepolia", "https://sepolia.optimism.io", "/img/optimism_logo.png", 11155420, "test"),
        new Network("poly-test", "Polygon Amoy Testnet", "https://rpc-amoy.polygon.technology", "/img/polygon_matic_logo.svg", 80002, "test"),
    ];

    private static CustomNetworks: Network[] = [ ];

    public static getNetworks(type: string = "") : Network[] {
        if (typeof window !== 'undefined') {
            var cust = localStorage.getItem("customNetworks");
            if (cust != null) {
                var custom = atob(cust);
                Network.CustomNetworks = JSON.parse(custom);
            }
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
            new Network("cst", name, rpc, "/img/w3tk_logo.png", chainId, "custom")
        );

        localStorage.setItem("customNetworks", btoa(JSON.stringify(this.CustomNetworks)));
        return true;
    }

    public static removeCustomNetwork(net: Network) {
        this.CustomNetworks = this.CustomNetworks.filter(element => !(element.name === net.name && element.rpcUrl === net.rpcUrl && element.chainId === net.chainId));
        localStorage.setItem("customNetworks", btoa(JSON.stringify(this.CustomNetworks)));
    }
}
