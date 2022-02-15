import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'w3tk-get-keys-from-seed-phrase',
  templateUrl: './get-keys-from-seed-phrase.component.html',
  styleUrls: ['./get-keys-from-seed-phrase.component.scss']
})
export class GetKeysFromSeedPhraseComponent implements OnInit {
  faPlay = faPlay;
  amount: number = 20;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  getPrivateKeys() {
    var result = "";
    var seedPhrase = this.dataService.lastResult;
    if(!seedPhrase) {
      seedPhrase = this.dataService.input;
    }
    
    for(var i = 0; i < this.amount; i++) {
      var path = this.getPath(i);
      var wallet = ethers.Wallet.fromMnemonic(seedPhrase, path);
      result += wallet.privateKey + "\n";
    }
    this.dataService.addResult("Get Private Keys", result.slice(0,-1));
    return result;
  }

  getPath(id: number) {
    var path = ethers.utils.getAccountPath(0);
    path = path.substring(0, path.lastIndexOf('/')+1) + id;
    return path;
  }

}
