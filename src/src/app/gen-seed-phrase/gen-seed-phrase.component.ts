import { Component, OnInit } from '@angular/core';
import Web3 from 'web3';
import { ethers } from 'ethers';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'w3tk-gen-seed-phrase',
  templateUrl: './gen-seed-phrase.component.html',
  styleUrls: ['./gen-seed-phrase.component.scss']
})
export class GenSeedPhraseComponent implements OnInit {
  faPlay = faPlay;
  result:string = "a";

  constructor() { }

  ngOnInit(): void {
  }

  clickEvent(){
    
    // slow version that generates keys and other stuff we dont need
    //var randomSeed = ethers.Wallet.createRandom();
    //this.result = randomSeed.mnemonic.phrase;

    var rand = ethers.utils.randomBytes(16);
    this.result = ethers.utils.entropyToMnemonic(rand);
    DataService.output = this.result;
    
    return this.result;
  }

  toClipboard() {
    this
  }
}
