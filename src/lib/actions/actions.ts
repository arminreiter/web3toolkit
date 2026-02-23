import { formatUnits, parseUnits, isAddress } from "ethers";
import { ActionInput } from "../models/actioninput";
import { Module } from "../models/module";
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
            new SimpleAction("Import Wallet from JSON", Module.KeyManagement, "Imports a wallet from encrypted V3 keystore JSON (input: json|password)", async (input: ActionInput) => {
                const parts = input.input.split('|');
                const json = parts[0].trim();
                const password = parts.length > 1 ? parts[1].trim() : '';
                const wallet = await Web3Service.importWalletFromJson(json, password);
                return `${wallet.address}\n${wallet.privateKey}`;
            }),
            new GetBalance(),
            new SimpleAction("From Wei", Module.Utils, "Converts a input value from wei to native value", async (input:ActionInput) => { return formatUnits(input.input, 'ether'); }),
            new SimpleAction("To Wei", Module.Utils, "Converts a decimal value to wei", async (input:ActionInput) => { return parseUnits(input.input, 'ether').toString(); }),
            new IsValidSeedPhrase(),
            new SimpleAction("Is Valid Address", Module.Utils, "Checks if an address is a valid address", async (input:ActionInput) => { return String(isAddress(input.input)); }),
            new SimpleAction("Get Block", Module.Blockchain, "Read the data of the given block (number)", async (input:ActionInput) => { return await Web3Service.getBlock(parseInt(input.input), input.network); }, true),
            new SimpleAction("Get Transaction", Module.Blockchain, "Returns the transaction of the given tx hash", async (input:ActionInput) => { return await Web3Service.getTransaction(input.input, input.network); }, true),
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
