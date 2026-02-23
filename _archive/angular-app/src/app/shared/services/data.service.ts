import { Injectable } from "@angular/core";
import { Action } from "../actions/action";
import { ActionInput } from "../model/actioninput";
import { Network } from "../model/network";

@Injectable({
    providedIn: 'root'
  })
export class DataService {
    public input: string = "";
    public lastResult: string = "";
    public results: ActionResult[] = [ ];
    public network: Network = Network.getNetworks()[0];
    public actions: Action[] = [];

    addResult(actionName: string, value: string) {
        this.lastResult = value;
        this.results.push(new ActionResult(actionName, value));
    }

    addAction(action: Action) {
        this.actions.push(action);
    }

    removeAction(id: number) {
        const index = this.actions.findIndex(a => a.id == id);
        if (index !== -1) {
            this.actions.splice(index, 1);
        }
    }

    getInput() : ActionInput {
        return new ActionInput( this.lastResult ? this.lastResult.trim() : this.input.trim(), this.network );
    }

    clear() {
        this.lastResult = "";
        this.results = [];
    }

    trySetNetwork(net: string) {
        var network = Network.getNetwork(net);
        if(network) {
            this.network = network;
        }
    }
}

export class ActionResult {
    constructor(public actionName: string, public result: string) {
    }
}
