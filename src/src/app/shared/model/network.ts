export class Network {
    constructor(public shortName:string, public name: string, public rpcUrl: string, public imgUrl: string, public chainId?: number, public isTestNet: boolean = false) {
    }

    public static Networks: Network[] = [
        new Network("eth-main", "Ethereum", "https://cloudflare-eth.com", "assets/img/ethereum_logo.webp"),
        new Network("gns-main", "Gnosis", "https://rpc.gnosischain.com", "assets/img/gnosis_logo.png", 100),
        new Network("ecs-main", "eCredits", "https://rpc.ecredits.com", "assets/img/eCredits_logo.png", 63000),
        //new Network("eth-rinkeby", "Ethereum Rinkeby", "https://cloudflare-eth.com", "assets/img/Ethereum_logo.svg", true),
        new Network("ecs-test", "eCredits Testnet", "https://rpc.tst.ecredits.com", "assets/img/eCredits_logo.png", 63001, true),
    ];
}