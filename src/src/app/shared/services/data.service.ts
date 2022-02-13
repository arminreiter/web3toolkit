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
    public actions: Action[] = [];

    addResult(actionName: string, value: string) {
        this.lastResult = value;
        this.results.push(new ActionResult(actionName, value));
    }

    addAction(action: Action) {
        this.actions.push(action);
    }

    removeAction(id: number) {
        var index = this.actions.findIndex((a) => a.id == id);
        this.actions.splice(index, 1);
    }

    getInput() {
        if(this.lastResult) {
            return this.lastResult;
        }
        return this.input;
    }

    clear() {
        this.lastResult = "";
        this.results = [];
    }
}

export class ActionResult {
    constructor(public actionName: string, public result: string) {
    }
}

export class Action {
    private static counter:number = 0;
    public id:number = Action.counter++;

    constructor(public title: string, public action: Function) {
    }
}

export class Network {
    constructor(public shortName:string, public name: string, public rpcUrl: string, public imgUrl: string, public isTestNet: boolean) {
    }

    public static Networks: Network[] = [
        new Network("eth-main", "Ethereum", "https://cloudflare-eth.com", "assets/img/ethereum_logo.webp", false),
        new Network("ecs-main", "eCredits", "https://rpc.ecredits.com", "assets/img/eCredits_logo.png", false),
        //new Network("eth-rinkeby", "Ethereum Rinkeby", "https://cloudflare-eth.com", "assets/img/Ethereum_logo.svg", true),
        new Network("ecs-test", "eCredits Testnet", "https://rpc.tst.ecredits.com", "assets/img/eCredits_logo.png", true),
    ];
}