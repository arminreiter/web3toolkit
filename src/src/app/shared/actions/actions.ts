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
            Actions.genKeyPairAction(),
            Actions.derivePrivateKeys(),
            Actions.getAddressesFromSeedPhrase(), 
            Actions.getAddressesFromPrivateKeys(),
            new GetBalance(),
            new SimpleAction("From Wei", Module.Utils, "Converts a input value from wei to native value", async (input:ActionInput) => { return Web3.utils.fromWei(input.input); }),
            new SimpleAction("To Wei", Module.Utils, "Converts a decimal value to wei", async (input:ActionInput) => { return Web3.utils.toWei(input.input); }),
            new IsValidSeedPhrase(),
            new SimpleAction("Is Valid Address", Module.Utils, "Checks if an address is a valid address", async (input:ActionInput) => { return String(Web3.utils.isAddress(input.input, input.network.chainId)); }),
            new SimpleAction("Get Block", Module.Blockchain, "Read the data of the given block (number)", async (input:ActionInput) => { return await Web3Service.getBlock(parseInt(input.input), input.network); }, true),
            new SimpleAction("Get Transaction", Module.Blockchain, "Returns the transaction of the given tx hash", async (input:ActionInput) => { return await Web3Service.getTransaction(input.input, input.network); }, true),
            //new SimpleAction("", Module.Utils, "", async (input:ActionInput) => { return ""; }),
        ];

        return all;
    }

    public static genSeedPhraseAction() : Action {
        return new SimpleAction("Generate Seed Phrase", Module.KeyManagement, "Generates a new seed phrase", async (input: ActionInput) => { return Web3Service.genSeedPhrase(); });
    }

    public static genKeyPairAction() : Action {
        return new SimpleAction("Generate Key Pair", Module.KeyManagement, "Generate a new private key and public address", async (input: ActionInput) => { return Web3Service.genKeyPair(); })
    }

    public static getAddressesFromSeedPhrase() : Action {
        return new SimpleAction("Get Addresses from Seed Phrase", Module.KeyManagement,"Gets public addresses from a seed phrase", async (input:ActionInput) => { return Web3Service.getAddresses(input.input, 20); });
    }

    public static getAddressesFromPrivateKeys() : Action {
        return new SimpleAction("Get Addresses from Private Key(s)", Module.KeyManagement,"Gets public addresses of private keys", async (input:ActionInput) => { return Web3Service.getAddressFromPrivateKeys(input.input.split("\n")).join("\n"); });
    }

    public static derivePrivateKeys() : Action {
        return new SimpleAction("Get Private Keys", Module.KeyManagement, "Derives private keys from a seed phrase", async (input: ActionInput) => { return Web3Service.getPrivateKeys(input.input, 20).join("\n"); });
    }
}
