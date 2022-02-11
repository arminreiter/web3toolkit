import { Component, OnInit } from '@angular/core';
import Web3 from 'web3';
import { ethers } from 'ethers';
import { isExpressionWithTypeArguments } from 'typescript';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'w3tk-get-keys-from-seed-phrase',
  templateUrl: './get-keys-from-seed-phrase.component.html',
  styleUrls: ['./get-keys-from-seed-phrase.component.scss']
})
export class GetKeysFromSeedPhraseComponent implements OnInit {
  faPlay = faPlay;
  result: string = "";
  seedPhrase: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  getPrivateKeys() {
    this.result = "";

    for(var i = 0; i < 20; i++) {
      var path = this.getPath(i);
      var wallet = ethers.Wallet.fromMnemonic(this.seedPhrase, path);
      this.result += wallet.privateKey + "\n";
    }
    return this.result;
  }

  getPublicAddresses() {
    this.result = "";
    
    for(var i = 0; i < 20; i++) {
      var path = this.getPath(i);
      console.log(path);
      var wallet = ethers.Wallet.fromMnemonic(this.seedPhrase, path);
      this.result += wallet.address + "\n";
    }

    return this.result;
  }

  getPath(id: number) {
    var path = ethers.utils.getAccountPath(0);
    path = path.substring(0, path.lastIndexOf('/')+1) + id;
    return path;
  }

}
