import Web3 from "web3";
import { ActionInput } from "../model/actioninput";
import { Module } from "../model/module";
import { Web3Service } from "../services/web3.service";
import { Action, SimpleAction } from "./action";
import { GetBalance } from "./getBalance";
import { IsValidSeedPhrase } from "./isValidSeedPhrase";

export class Actions {
    public static get(): Action[] {
        var all: Action[] = [
            Actions.genSeedPhraseAction(),
            Actions.derivePrivateKeys(),
            Actions.getAddressesFromSeedPhrase(), 
            Actions.getAddressesFromPrivateKeys(),
            new GetBalance(),
            new SimpleAction("From Wei", Module.Utils, "Converts a input value from wei to native value", async (input:ActionInput) => { return Web3.utils.fromWei(input.input); }),
            new SimpleAction("To Wei", Module.Utils, "Converts a decimal value to wei", async (input:ActionInput) => { return Web3.utils.toWei(input.input); }),
            new IsValidSeedPhrase(),
            new SimpleAction("Is Valid Address", Module.Utils, "Checks if an address is a valid address", async (input:ActionInput) => { return String(Web3.utils.isAddress(input.input, input.network.chainId)); }),
            //new SimpleAction("", Module.Utils, "", async (input:ActionInput) => { return ""; }),
        ];

        return all;
    }

    public static genSeedPhraseAction() : Action {
        return new SimpleAction("Generate Seed Phrase", Module.KeyManagement, "Generates a new seed phrase", async (input: ActionInput) => { return Web3Service.genSeedPhrase(); });
    }

    public static getAddressesFromSeedPhrase() : Action {
        return new SimpleAction("Get Addresses from Seed Phrase", Module.KeyManagement,"Gets public addresses from a seed phrase", async (input:ActionInput) => { return Web3Service.getAddresses(input.input, 20); });
    }

    public static getAddressesFromPrivateKeys() : Action {
        return new SimpleAction("Get Addresses from Private Key(s)", Module.KeyManagement,"Gets public addresses of private keys", async (input:ActionInput) => { return Web3Service.getAddressFromPrivateKeys(input.input); });
    }

    public static derivePrivateKeys() : Action {
        return new SimpleAction("Get Private Keys", Module.KeyManagement, "Derives private keys from a seed phrase", async (input: ActionInput) => { return Web3Service.getPrivateKeys(input.input, 20); });
    }
}
