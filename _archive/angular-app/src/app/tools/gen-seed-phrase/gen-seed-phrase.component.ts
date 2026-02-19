import { Component, Input, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/shared/services/web3.service';

@Component({
    selector: 'w3tk-gen-seed-phrase',
    templateUrl: './gen-seed-phrase.component.html',
    styleUrls: ['./gen-seed-phrase.component.scss'],
    standalone: false
})
export class GenSeedPhraseComponent implements OnInit {
  genSeeds: String = "";
  nrOfSeeds: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  genSeedPhrase()
  {
    this.genSeeds = "";

    for(var i = 0; i < this.nrOfSeeds; i++) {
      this.genSeeds += Web3Service.genSeedPhrase() + "\n";
    }
  }

}
