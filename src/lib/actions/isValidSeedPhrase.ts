import { Mnemonic } from 'ethers';
import { Action } from "./action";
import { ActionInput } from "../models/actioninput";
import { Module } from "../models/module";


export class IsValidSeedPhrase extends Action {
    title: string = "Is Valid Seed Phrase";
    description: string = "Checks if a seed phrase is valid";
    module: Module = Module.Utils;
    requiresConnection: boolean = false;

    public amount:number = 20;

    async run(input: ActionInput): Promise<string> {

        return String( Mnemonic.isValidMnemonic(input.input));
    }
}
