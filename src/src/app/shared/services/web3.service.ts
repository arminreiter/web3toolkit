import { ethers } from "ethers";
import Web3 from "web3";

export class Web3Service {

    static genSeedPhrase() {
        var rand = ethers.utils.randomBytes(16);
        var result = ethers.utils.entropyToMnemonic(rand);
        return result;
    }

    static getPrivateKeys(seedPhrase: string, amount: number) {
        var result = "";

        for (var i = 0; i < amount; i++) {
            var path = this.getPath(i);
            var wallet = ethers.Wallet.fromMnemonic(seedPhrase, path);
            result += wallet.privateKey + "\n";
        }

        return result.slice(0, -1);
    }

    static getPath(id: number) {
        var path = ethers.utils.getAccountPath(0);
        path = path.substring(0, path.lastIndexOf('/')+1) + id;
        return path;
    }
    
    static async getBalances(addresses: string, rpcUrl: string): Promise<string> {
        var result = "";
        var web3js = new Web3(new Web3.providers.HttpProvider(rpcUrl));

        var spadd = addresses.split("\n");

        var promises: Promise<string | void>[] = [];

        spadd.forEach(address => {
            promises.push(
                web3js.eth.getBalance(address).then((bal) => {
                result += address + ": " + Web3.utils.fromWei(bal) + "\n";
                })
            );
        });

        await Promise.all(promises).then(() => {
            result = result.slice(0,-1);
        });
        return result;
    }

    static getAddresses(seedPhrase: string, amount:number) {
        var result = "";

        for (var i = 0; i < amount; i++) {
            var path = this.getPath(i);
            var wallet = ethers.Wallet.fromMnemonic(seedPhrase, path);
            result += wallet.address + "\n";
        }

        return result.slice(0, -1);
    }

    static getAddressFromPrivateKeys(keys: string) {
        var keyarr = keys.split("\n");
        var result = "";

        var web3js = new Web3();

        keyarr.forEach(key => {
            result += web3js.eth.accounts.privateKeyToAccount(key).address + "\n";
        }); 

        return result.slice(0, -1);
    }

}