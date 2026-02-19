import { ActionInput } from "../model/actioninput";
import { Module } from "../model/module";
import { Web3Service } from "../services/web3.service";
import { Action } from "./action";

export class GetBalance extends Action {
    title: string = "Get Balance";
    description: string = "Returns the balance of the public addresses (native or token)";
    module: Module = Module.Wallet;
    requiresConnection: boolean = true;
    
    async run(input: ActionInput): Promise<string> {
        // Check if the input contains tokenAddress
        const parts = input.input.split('|');
        const addresses = parts[0].trim();
        const tokenAddress = parts.length > 1 ? parts[1].trim() : undefined;

        let result = "";
        for await (const balance of Web3Service.getBalancesAsync(
            addresses, 
            input.network.rpcUrl, 
            ": ",
            tokenAddress)) {
            result += balance;
        }
        return result;
    }
}
