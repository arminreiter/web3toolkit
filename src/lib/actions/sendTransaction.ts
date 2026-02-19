import { Action } from "./action";
import { ActionInput } from "../models/actioninput";
import { Module } from "../models/module";


export class SendTransaction extends Action {
    title: string = "Send Transaction";
    description: string = "Creates a new transaction and sends it to the network";
    module: Module = Module.Utils;
    requiresConnection: boolean = true;

    public amount:number = 20;

    async run(input: ActionInput): Promise<string> {

        return "";

    }
}
