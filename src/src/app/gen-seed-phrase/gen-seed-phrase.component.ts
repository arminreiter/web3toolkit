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
  
  constructor(public dataService: DataService) { 
  }

  ngOnInit(): void {
  }

  clickEvent(){
    
    // slow version that generates keys and other stuff we dont need
    //var randomSeed = ethers.Wallet.createRandom();
    //this.result = randomSeed.mnemonic.phrase;

    var rand = ethers.utils.randomBytes(16);
    var result = ethers.utils.entropyToMnemonic(rand);
    this.dataService.addResult("Generate Seed Phrase", result);
  }

  toClipboard() {
    this
  }
}
