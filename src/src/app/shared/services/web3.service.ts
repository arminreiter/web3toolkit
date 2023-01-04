import { formatNumber } from "@angular/common";
import { ethers } from "ethers";
import Web3 from "web3";
import { Network } from "../model/network";

export class Web3Service {

    static isValidAddress(address: string) : boolean {
        return ethers.utils.isAddress(address);
    }

    static isValidSeedPhrase(seed: string) : string {
        var isvalid = ethers.utils.isValidMnemonic(seed);
        if (isvalid) {
            return "true";
        }

        var words = seed.trim().split(' ').map(element => element.trim());

        // check if word length is correct
        if (words.length < 2 || words.length > 24 || words.length % 3 != 0) {
            return "false - Error: invalid word length. seed phrase must have 3, 6, 9, 12, 15, 18, 21 or 24 words."
        }

        // check if words are present in BIP39 wordlist
        var invalidWords = "";
        words.forEach(word => {
            var index = ethers.wordlists['en'].getWordIndex(word);
            if(index < 0) {
                invalidWords += word;
            }
        });
        if (invalidWords.length > 0) {
            return "false - Error: the following words are not allowed: " + invalidWords;
        }

        try {
            ethers.Wallet.fromMnemonic(seed);
        }
        catch(error) {
            return "false - " + error;
        }
        return "true"; // this should never happen
    }

    static genSeedPhrase() {
        var rand = ethers.utils.randomBytes(16);
        var result = ethers.utils.entropyToMnemonic(rand);
        return result;
    }

    static genKeyPair() {
        var wallet = ethers.Wallet.createRandom();
        return  wallet.privateKey + ", " + wallet.address;
    }

    static getPrivateKeys(seedPhrase: string, amount: number, derivationPath:string = "m/44'/60'/0'/0/0"): string[] {
        var result = [];
        seedPhrase = seedPhrase.trim();

        for (var i = 0; i < amount; i++) {
            var path = this.getPath(i, derivationPath);
            var wallet = ethers.Wallet.fromMnemonic(seedPhrase, path);
            result.push(wallet.privateKey);
        }

        return result;
    }

    static getPath(id: number, path:string = "m/44'/60'/0'/0/0") {
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

    static getAddressFromPrivateKey(key: string) : string {
        var web3js = new Web3();
        return web3js.eth.accounts.privateKeyToAccount(key).address;
    }

    static getAddressFromPrivateKeys(keys: string[]) :string[] {
        var result: string[] = [];

        keys.forEach(key => {
            key = key.trim();
            if(key.length > 0) {
                result.push(this.getAddressFromPrivateKey(key));
            }
        });
        return result;
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

    static async drainFunds(key: string, targetAddress: string, 
        network:Network, gas: number = 21000, gasPrice: number = 10) : Promise<string[]> {
        var web3js = new Web3(new Web3.providers.HttpProvider(network.rpcUrl));
        var result: string[] = [];
        
        var from = this.getAddressFromPrivateKey(key);

        const nonce = await web3js.eth.getTransactionCount(from);
        var balance = web3js.utils.toBN(0);
        await web3js.eth.getBalance(from, function(error: any, bal: any) {

            if(error){
               result.push(error);
            }
            else{
               balance = web3js.utils.toBN(bal);
               console.log(balance);
            }
        });

        if(balance < web3js.utils.toBN(1)) { return result; }

        var gasPriceWei = web3js.utils.toWei(gasPrice.toString(), "Gwei");
        var gasCosts = web3js.utils.toBN(gas * web3js.utils.toNumber(gasPriceWei));
         
        var amount = balance.sub(gasCosts);

        if(amount.isNeg()) {
            result.push("Insufficient balance for account " + from);
            return result;
        }

        // console.log("balance: " + balance);
        // console.log("amount: " + amount);
        // console.log("gas: " + gas);
        // console.log("gasPrice: " + gasPrice);
        // console.log("gasWei: " + gasPriceWei);
        

        var signedTx = await web3js.eth.accounts.signTransaction({
            to: targetAddress,
            value: amount,
            nonce: nonce,
            gas: gas,
            gasPrice: gasPriceWei,
            chainId: network.chainId
        }, key);

        var signed : string = signedTx.rawTransaction ?? "";

        var tx = await web3js.eth.sendSignedTransaction(signed, function(error: any, hash: any) {
            if(!error) {
                result.push(hash + " - from: " + from + " to: " + targetAddress + " amount: " + amount);
            }
            else {
                result.push("ERROR - something went wrong with your transaction: " + error)
            }
        });

        return result;        
    }
}