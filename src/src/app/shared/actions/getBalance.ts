import { ActionInput } from "../model/actioninput";
import { Module } from "../model/module";
import { Web3Service } from "../services/web3.service";
import { Action } from "./action";

export class GetBalance extends Action {
    title: string = "Get Balance";
    description: string = "Returns the balance of the public addresses";
    module: Module = Module.Wallet;
    requiresConnection: boolean = true;
    
    async run(input: ActionInput): Promise<string> {
        return await Web3Service.getBalances(input.input, input.network.rpcUrl);
    }
}
