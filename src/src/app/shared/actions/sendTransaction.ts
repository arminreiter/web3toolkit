import { Action } from "../actions/action";
import { ActionInput } from "../model/actioninput";
import { Module } from "../model/module";


export class SendTransaction extends Action {
    title: string = "Send Transaction";
    description: string = "Creates a new transaction and sends it to the network";
    module: Module = Module.Utils;

    public amount:number = 20;

    async run(input: ActionInput): Promise<string> {
        
        return "";

    }
}