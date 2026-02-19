import { ethers, Mnemonic, isAddress, Wallet, randomBytes, HDNodeWallet, JsonRpcProvider, Contract, formatUnits, parseUnits, computeAddress, Network as EthersNetwork } from "ethers";
import { Network } from "../models/network";

const ERC20_ABI = [
    "function balanceOf(address) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
];

export class Web3Service {

    static isValidAddress(address: string) : boolean {
        return isAddress(address);
    }

    static isValidSeedPhrase(seed: string) : string {
        var isValid = Mnemonic.isValidMnemonic(seed);
        if (isValid) {
            return "VALID";
        }

        var words = seed.trim().split(' ').map(element => element.trim());

        // check if word length is correct
        if (words.length < 2 || words.length > 24 || words.length % 3 != 0) {
            return "INVALID - Error: invalid word length. seed phrase must have 3, 6, 9, 12, 15, 18, 21 or 24 words."
        }

        // check if words are present in BIP39 wordlist
        var invalidWords = "";
        words.forEach(word => {
            var index = ethers.wordlists['en'].getWordIndex(word);
            if(index < 0) {
                var alternatives = this.getSimilarWords(word, ethers.wordlists['en']).join(', ');

                invalidWords += word + " (similar, allowed words: " + alternatives + ") " ;
            }
        });
        if (invalidWords.length > 0) {
            return "INVALID - Error: the following words are not allowed: " + invalidWords;
        }

        try {
            Wallet.fromPhrase(seed);
        }
        catch(error) {
            return "INVALID - " + error;
        }
        return "VALID"; // this should never happen
    }

    static genSeedPhrase() {
        var rand = randomBytes(16);
        var result = Mnemonic.fromEntropy(rand);
        return result.phrase;;
    }

    static genKeyPair() {
        var wallet = ethers.Wallet.createRandom();
        return  wallet.privateKey + ", " + wallet.address;
    }

    static getPrivateKeys(seedPhrase: string, amount: number, derivationPath:string = "m/44'/60'/0'/0/0"): string[] {

        seedPhrase = seedPhrase.trim();

        // Create master wallet once
        const mnemonic = Mnemonic.fromPhrase(seedPhrase);
        const seed = mnemonic.computeSeed();
        const hdWallet = HDNodeWallet.fromSeed(seed);

        const result: string[] = [];

        for (var i = 0; i < amount; i++) {
            var path = this.getPath(i, derivationPath);
            const wallet = hdWallet.derivePath(path);
            result.push(wallet.privateKey);
        }

        return result;
    }

    static async *getPrivateKeysAsync(seedPhrase: string, amount: number, derivationPath: string = "m/44'/60'/0'/0/0") {
        seedPhrase = seedPhrase.trim();

        const mnemonic = Mnemonic.fromPhrase(seedPhrase);
        const seed = mnemonic.computeSeed();
        const hdWallet = HDNodeWallet.fromSeed(seed);

        for (var i = 0; i < amount; i++) {
          var path = this.getPath(i, derivationPath);
          const wallet = hdWallet.derivePath(path);
          yield wallet.privateKey;
        }
      }

    static getPath(id: number, path:string = "m/44'/60'/0'/0/0") {
        path = path.substring(0, path.lastIndexOf('/')+1) + id;
        return path;
    }

    static async getBalances(addresses: string, rpcUrl: string, delimiter: string = ": "): Promise<string> {
        var result = "";
        const provider = new JsonRpcProvider(rpcUrl);

        var spadd = addresses.split("\n");

        var promises: Promise<string | void>[] = [];

        spadd.forEach(address => {
            address = address.trim();
            if(address.length > 0) {
                promises.push(
                    provider.getBalance(address).then((bal) => {
                    result += address + delimiter + formatUnits(bal, 'ether') + "\n";
                    })
                );
            }
        });

        await Promise.all(promises).then(() => {
            result = result.slice(0,-1);
        });
        return result;
    }

    static async *getBalancesAsync(addresses: string, rpcUrl: string, delimiter: string = ": ", tokenAddress?: string): AsyncGenerator<string> {
        const provider = new JsonRpcProvider(rpcUrl);
        var spadd = addresses.split("\n");

        // If tokenAddress is provided, create contract instance
        let contract: Contract | undefined = undefined;
        if (tokenAddress) {
            contract = new Contract(tokenAddress, ERC20_ABI, provider);
        }

        for (let address of spadd) {
          address = address.trim();
          if (address.length > 0) {
            try {
                let balance;
                if (tokenAddress && contract) {
                    // Get token balance
                    const balanceRaw: bigint = await contract.balanceOf(address);
                    const decimals: bigint = await contract.decimals();
                    balance = formatUnits(balanceRaw, Number(decimals));
                } else {
                    // Get native currency balance
                    const bal = await provider.getBalance(address);
                    balance = formatUnits(bal, 'ether');
                }
                yield `${address}${delimiter}${balance}\n`;
            } catch (error) {
              yield(`Error fetching balance for address ${address}: ` + error + '\n');
            }
          }
        }
    }

    static async *getBalancesPerBlockAsync(address: string, rpcUrl: string, delimiter: string = ", ", startBlock: bigint, endBlock: bigint, iteration: number, tokenAddress?: string): AsyncGenerator<string> {
        const provider = new JsonRpcProvider(rpcUrl);

        // If tokenAddress is provided, create contract instance
        let contract: Contract | undefined = undefined;
        if (tokenAddress) {
            contract = new Contract(tokenAddress, ERC20_ABI, provider);
        }

        for(let i = Number(startBlock); i <= Number(endBlock); i += iteration) {
            try {
                let balance;
                if (tokenAddress && contract) {
                    // Get token balance at specific block
                    const balanceRaw: bigint = await contract.balanceOf(address, { blockTag: i });
                    const decimals: bigint = await contract.decimals();
                    balance = formatUnits(balanceRaw, Number(decimals));
                } else {
                    // Get native currency balance at specific block
                    const bal = await provider.getBalance(address, i);
                    balance = formatUnits(bal, 'ether');
                }
                yield `${i}${delimiter}${address}${delimiter}${balance}\n`;
            } catch (error: any) {
                const msg = this.formatRpcError(error);
                yield `Error at block ${i} for ${address}: ${msg}\n`;
            }
        }
    }

    static getAddresses(seedPhrase: string, amount:number, derivationPath:string = "m/44'/60'/0'/0/0") {
        seedPhrase = seedPhrase.trim();

        // Create master wallet once
        const mnemonic = Mnemonic.fromPhrase(seedPhrase);
        const seed = mnemonic.computeSeed();
        const hdWallet = HDNodeWallet.fromSeed(seed);

        const addresses: string[] = [];

        for (var i = 0; i < amount; i++) {
            var path = this.getPath(i, derivationPath);
            const wallet = hdWallet.derivePath(path);
            addresses.push(wallet.address);
        }

        return addresses.join("\n");
    }

    static async importWalletFromJson(json: string, password: string): Promise<{ address: string; privateKey: string }> {
        const wallet = await Wallet.fromEncryptedJson(json, password);
        return { address: wallet.address, privateKey: wallet.privateKey };
    }

    static async exportWalletToJson(privateKey: string, password: string = ''): Promise<string> {
        const wallet = new Wallet(privateKey);
        return wallet.encrypt(password);
    }

    static getAddressFromPrivateKey(key: string) : string {
        return computeAddress(key);
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


    static async getLastBlockNumber(network:Network) : Promise<bigint> {
        const provider = new JsonRpcProvider(network.rpcUrl);
        const blockNumber = await provider.getBlockNumber();
        return BigInt(blockNumber);
    }

    static async getBlockByTimestamp(provider: JsonRpcProvider, targetTimestamp: number): Promise<number> {
        const latestBlock = await provider.getBlock('latest');
        if (!latestBlock) throw new Error('Could not fetch latest block');

        if (targetTimestamp >= latestBlock.timestamp) return latestBlock.number;
        const genesisBlock = await provider.getBlock(0);
        if (genesisBlock && targetTimestamp <= genesisBlock.timestamp) return 0;

        let lo = 0;
        let hi = latestBlock.number;

        while (lo < hi) {
            const mid = Math.floor((lo + hi) / 2);
            const block = await provider.getBlock(mid);
            if (!block) { lo = mid + 1; continue; }

            if (block.timestamp < targetTimestamp) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }

    static async *getBalancesPerDatetimeAsync(
        address: string,
        rpcUrl: string,
        delimiter: string = ", ",
        startTimestamp: number,
        endTimestamp: number,
        intervalSeconds: number,
        tokenAddress?: string,
        useUtc: boolean = true
    ): AsyncGenerator<string> {
        const provider = new JsonRpcProvider(rpcUrl);

        let contract: Contract | undefined = undefined;
        if (tokenAddress) {
            contract = new Contract(tokenAddress, ERC20_ABI, provider);
        }

        let lastBlockNum = await this.getBlockByTimestamp(provider, startTimestamp);

        for (let ts = startTimestamp; ts <= endTimestamp; ts += intervalSeconds) {
            try {
                let blockNum: number;
                if (ts === startTimestamp) {
                    blockNum = lastBlockNum;
                } else {
                    // Narrow binary search from last known block
                    const estimatedJump = Math.max(1, Math.floor(intervalSeconds / 12));
                    const latestBlock = await provider.getBlock('latest');
                    const maxBlock = latestBlock ? latestBlock.number : lastBlockNum + estimatedJump * 2;

                    let lo = lastBlockNum;
                    let hi = Math.min(lastBlockNum + estimatedJump * 2, maxBlock);

                    // Expand hi if its timestamp is still before target
                    let hiBlock = await provider.getBlock(hi);
                    while (hiBlock && hiBlock.timestamp < ts && hi < maxBlock) {
                        lo = hi;
                        hi = Math.min(hi * 2, maxBlock);
                        hiBlock = await provider.getBlock(hi);
                    }

                    while (lo < hi) {
                        const mid = Math.floor((lo + hi) / 2);
                        const midBlock = await provider.getBlock(mid);
                        if (!midBlock) { lo = mid + 1; continue; }
                        if (midBlock.timestamp < ts) {
                            lo = mid + 1;
                        } else {
                            hi = mid;
                        }
                    }
                    blockNum = lo;
                }

                lastBlockNum = blockNum;

                let balance: string;
                if (tokenAddress && contract) {
                    const balanceRaw: bigint = await contract.balanceOf(address, { blockTag: blockNum });
                    const decimals: bigint = await contract.decimals();
                    balance = formatUnits(balanceRaw, Number(decimals));
                } else {
                    const bal = await provider.getBalance(address, blockNum);
                    balance = formatUnits(bal, 'ether');
                }

                const dt = this.formatTimestamp(ts, useUtc);
                yield `${dt}${delimiter}${blockNum}${delimiter}${address}${delimiter}${balance}\n`;
            } catch (error: any) {
                const dt = this.formatTimestamp(ts, useUtc);
                const msg = this.formatRpcError(error);
                yield `Error at ${dt} for ${address}: ${msg}\n`;
            }
        }
    }

    static async getBlock(blockNumber:number, network:Network) : Promise<string> {
        const provider = new JsonRpcProvider(network.rpcUrl);
        var block = await provider.getBlock(blockNumber);

        return JSON.stringify(block, null, 2);
    }

    static async getTransaction(txHash:string, network:Network) : Promise<string> {
        const provider = new JsonRpcProvider(network.rpcUrl);
        var tx = await provider.getTransaction(txHash);

        return JSON.stringify(tx, null, 2);
    }

    static async drainFunds(key: string, targetAddress: string,
        network:Network, gas: number = 21000, gasPrice: number = 10) : Promise<string> {
        const provider = new JsonRpcProvider(network.rpcUrl);
        var result: string = "";

        var from = this.getAddressFromPrivateKey(key);

        const nonce = await provider.getTransactionCount(from);
        var balance = BigInt(0);
        try {
            balance = await provider.getBalance(from);
        }
        catch(error: any) {
            result = error.message;
        }

        if(balance < BigInt(1)) { return result; }

        var gasPriceWei = parseUnits(gasPrice.toString(), "gwei");
        var gasCosts = BigInt(gas) * gasPriceWei;

        var amount =  balance - gasCosts;

        if(amount < BigInt(0)) {
            result = "Insufficient balance for account " + from;
            return result;
        }

        const wallet = new Wallet(key, provider);

        try {
            var tx = await wallet.sendTransaction({
                to: targetAddress,
                value: amount,
                nonce: nonce,
                gasLimit: gas,
                gasPrice: gasPriceWei,
            });
            var receipt = await tx.wait();
            result = (receipt?.hash ?? tx.hash) + " - from: " + from + " to: " + targetAddress + " amount: " + amount;
        }
        catch(error: any) {
            result = "ERROR - something went wrong with your transaction: " + error.message;
        }

        return result;
    }


    static async getTokenInfo(tokenAddress: string, network: Network): Promise<{
        name: string;
        symbol: string;
        decimals: number;
        totalSupply: string;
    }> {
        const provider = new JsonRpcProvider(network.rpcUrl);
        const contract = new Contract(tokenAddress, ERC20_ABI, provider);

        const [name, symbol, decimals, totalSupply] = await Promise.all([
            contract.name() as Promise<string>,
            contract.symbol() as Promise<string>,
            contract.decimals() as Promise<bigint>,
            contract.totalSupply() as Promise<bigint>,
        ]);

        return {
            name,
            symbol,
            decimals: Number(decimals),
            totalSupply: formatUnits(totalSupply, Number(decimals)),
        };
    }

    private static readonly ETH_MAINNET_RPC = "https://ethereum-rpc.publicnode.com";

    private static getEnsProvider(): JsonRpcProvider {
        const network = EthersNetwork.from("mainnet");
        return new JsonRpcProvider(this.ETH_MAINNET_RPC, network, { staticNetwork: network });
    }

    static async resolveENS(ensName: string): Promise<Record<string, string>> {
        const provider = this.getEnsProvider();
        const result: Record<string, string> = {};

        const address = await provider.resolveName(ensName);
        if (!address) {
            throw new Error(`No address found for "${ensName}"`);
        }
        result['Address'] = address;

        const resolver = await provider.getResolver(ensName);
        if (resolver) {
            const textKeys = [
                'avatar', 'email', 'url', 'description',
                'com.twitter', 'com.github', 'com.discord',
                'org.telegram',
            ];
            const textResults = await Promise.allSettled(
                textKeys.map((key) => resolver.getText(key))
            );
            for (let i = 0; i < textKeys.length; i++) {
                const r = textResults[i];
                if (r.status === 'fulfilled' && r.value) {
                    result[textKeys[i]] = r.value;
                }
            }

            try {
                const contentHash = await resolver.getContentHash();
                if (contentHash) result['Content Hash'] = contentHash;
            } catch {}
        }

        return result;
    }

    static async lookupENS(address: string): Promise<Record<string, string>> {
        const provider = this.getEnsProvider();
        const result: Record<string, string> = {};

        const name = await provider.lookupAddress(address);
        if (!name) {
            throw new Error(`No ENS name found for "${address}"`);
        }
        result['ENS Name'] = name;

        const resolved = await provider.resolveName(name);
        if (resolved) {
            result['Resolved Address'] = resolved;
        }

        const resolver = await provider.getResolver(name);
        if (resolver) {
            const textKeys = [
                'avatar', 'email', 'url', 'description',
                'com.twitter', 'com.github', 'com.discord',
                'org.telegram',
            ];
            const textResults = await Promise.allSettled(
                textKeys.map((key) => resolver.getText(key))
            );
            for (let i = 0; i < textKeys.length; i++) {
                const r = textResults[i];
                if (r.status === 'fulfilled' && r.value) {
                    result[textKeys[i]] = r.value;
                }
            }
        }

        return result;
    }

    // ============================= helper ==================================================
    private static formatRpcError(error: any): string {
        const msg = error?.message || String(error);
        if (msg.includes('missing trie node') || msg.includes('is not available')) {
            return 'Historical state not available — this RPC node is not an archive node.';
        }
        if (msg.includes('header not found')) {
            return 'Block not found — the RPC node may not have this block range.';
        }
        // Extract the inner RPC message if present
        const innerMatch = msg.match(/"message":\s*"([^"]+)"/);
        if (innerMatch) return innerMatch[1];
        return msg;
    }

    private static formatTimestamp(timestampSecs: number, useUtc: boolean = true): string {
        const d = new Date(timestampSecs * 1000);
        const dd = String(useUtc ? d.getUTCDate() : d.getDate()).padStart(2, '0');
        const mm = String((useUtc ? d.getUTCMonth() : d.getMonth()) + 1).padStart(2, '0');
        const yyyy = useUtc ? d.getUTCFullYear() : d.getFullYear();
        const hh = String(useUtc ? d.getUTCHours() : d.getHours()).padStart(2, '0');
        const min = String(useUtc ? d.getUTCMinutes() : d.getMinutes()).padStart(2, '0');
        const ss = String(useUtc ? d.getUTCSeconds() : d.getSeconds()).padStart(2, '0');
        const suffix = useUtc ? ' UTC' : '';
        return `${dd}/${mm}/${yyyy} ${hh}:${min}:${ss}${suffix}`;
    }

    // https://www.tutorialspoint.com/levenshtein-distance-in-javascript
    static levenshteinDistance (str1 = '', str2 = '')  {
        const track = Array(str2.length + 1).fill(null).map(() =>
        Array(str1.length + 1).fill(null));
        for (let i = 0; i <= str1.length; i += 1) {
           track[0][i] = i;
        }
        for (let j = 0; j <= str2.length; j += 1) {
           track[j][0] = j;
        }
        for (let j = 1; j <= str2.length; j += 1) {
           for (let i = 1; i <= str1.length; i += 1) {
              const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
              track[j][i] = Math.min(
                 track[j][i - 1] + 1, // deletion
                 track[j - 1][i] + 1, // insertion
                 track[j - 1][i - 1] + indicator, // substitution
              );
           }
        }
        return track[str2.length][str1.length];
     };

     static getSimilarWords(word: string, wordlist: ethers.Wordlist) : string[] {
        var tmpmap: string[] = []
        var shortestDistance = 100;

        for(var i = 0; i < 2048;i++) {
            var tmpword = wordlist.getWord(i);
            var distance = this.levenshteinDistance(word, tmpword);
            if(distance < shortestDistance) {
                shortestDistance = distance;
                tmpmap = [ tmpword ]
            }
            else if(distance == shortestDistance) {
                tmpmap.push( tmpword );
            }
        }
        return tmpmap;
     }
}
