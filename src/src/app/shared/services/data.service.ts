import { outputAst } from "@angular/compiler";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class DataService {
    public input: string = "";
    public lastResult: string = "";
    public results: ActionResult[] = [ ];
    public network: Network = Network.Networks[0];

    addResult(actionName: string, value: string) {
        // this.output = value;
        this.lastResult = value;

        this.results.push(new ActionResult(actionName, value));
    }

    getInput() {
        if(this.lastResult) {
            return this.lastResult;
        }
        return this.input;
    }
}

export class ActionResult {
    constructor(public actionName: string, public result: string) {
    }
}

export class Network {
    constructor(public shortName:string, public name: string, public rpcUrl: string, public imgUrl: string, public isTestNet: boolean) {
    }

    public static Networks: Network[] = [
        new Network("eth-main", "Ethereum", "https://cloudflare-eth.com", "assets/img/ethereum_logo.webp", false),
        new Network("ecs-main", "eCredits", "https://rpc.ecredits.com", "assets/img/eCredits_logo.png", false),
        //new Network("eth-rinkeby", "Ethereum Rinkeby", "https://cloudflare-eth.com", "assets/img/Ethereum_logo.svg", true),
        new Network("ecs-test", "eCredits Testnet", "https://rpc.test.ecredits.com", "assets/img/eCredits_logo.png", true),
    ];
}