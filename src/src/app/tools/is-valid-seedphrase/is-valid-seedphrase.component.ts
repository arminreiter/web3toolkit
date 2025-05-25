import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/shared/services/web3.service';

@Component({
    selector: 'w3tk-is-valid-seedphrase',
    templateUrl: './is-valid-seedphrase.component.html',
    styleUrls: ['./is-valid-seedphrase.component.scss'],
    standalone: false
})
export class IsValidSeedphraseComponent implements OnInit {
  seeds: string = "";
  result: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  isValidSeed() {
    this.result = "";
    var addresses = this.seeds.split("\n");
    addresses.forEach(seed => {
      if(seed.length > 0) {
        var valid = Web3Service.isValidSeedPhrase(seed);
        this.result += seed + ": " + valid + "\n";
      }
    });
    
  }
}
