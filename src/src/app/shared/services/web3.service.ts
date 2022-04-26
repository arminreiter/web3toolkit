import { ethers } from "ethers";
import Web3 from "web3";
import { Network } from "../model/network";

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

    static getPath(id: number, path:string = "m/44'/60'/0'/0/0") {
        //var path = ethers.utils.getAccountPath(0);
        path = path.substring(0, path.lastIndexOf('/')+1) + id;
        return path;
    }
    
    static async getBalances(addresses: string, rpcUrl: string, delimiter: string = ": "): Promise<string> {
        var result = "";
        var web3js = new Web3(new Web3.providers.HttpProvider(rpcUrl));

        var spadd = addresses.split("\n");

        var promises: Promise<string | void>[] = [];

        spadd.forEach(address => {
            address = address.trim();
            if(address.length > 0) {
                promises.push(
                    web3js.eth.getBalance(address).then((bal) => {
                    result += address + delimiter + Web3.utils.fromWei(bal) + "\n";
                    })
                );
            }
        });

        await Promise.all(promises).then(() => {
            result = result.slice(0,-1);
        });
        return result;
    }

    static async sendTransaction(from: string, network:Network, receiver: string, amount: number) {
        var web3js = new Web3(new Web3.providers.HttpProvider(network.rpcUrl));
        web3js.eth.sendTransaction({
            from: from,
            to: receiver,
            value: amount
        }).then((receipt) => {
            return receipt.transactionHash;
        })
    }

    static getAddresses(seedPhrase: string, amount:number, derivationPath:string = "m/44'/60'/0'/0/0") {
        var result = "";
        seedPhrase = seedPhrase.trim();

        for (var i = 0; i < amount; i++) {
            var path = this.getPath(i, derivationPath);
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
            key = key.trim();
            if(key.length > 0) {
                result += web3js.eth.accounts.privateKeyToAccount(key).address + "\n";
            }
        }); 

        return result.slice(0, -1);
    }

    static async getBlock(blockNumber:number, network:Network) : Promise<string> {
        var web3js = new Web3(new Web3.providers.HttpProvider(network.rpcUrl));
        var block = await web3js.eth.getBlock(blockNumber);
        
        return JSON.stringify(block, null, 2);
    }
    
    static async getTransaction(txHash:string, network:Network) : Promise<string> {
        var web3js = new Web3(new Web3.providers.HttpProvider(network.rpcUrl));
        var tx = await web3js.eth.getTransaction(txHash);
        
        return JSON.stringify(tx, null, 2);
    }
}