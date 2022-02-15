import { Component } from "@angular/core";
import { ethers } from "ethers";
import { Action } from "../actions/action";
import { ActionInput } from "../model/actioninput";
import { Module } from "../model/module";


export class IsValidSeedPhrase extends Action {
    title: string = "Is Valid Seed Phrase";
    description: string = "Checks if a seed phrase is valid";
    module: Module = Module.Utils;

    public amount:number = 20;

    async run(input: ActionInput): Promise<string> {
        return String(ethers.utils.isValidMnemonic(input.input));
    }
}