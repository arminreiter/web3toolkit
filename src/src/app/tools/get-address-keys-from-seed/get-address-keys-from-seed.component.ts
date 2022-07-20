import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/shared/services/web3.service';

@Component({
  selector: 'w3tk-get-address-keys-from-seed',
  templateUrl: './get-address-keys-from-seed.component.html',
  styleUrls: ['./get-address-keys-from-seed.component.scss']
})
export class GetAddressKeysFromSeedComponent implements OnInit {
  seedPhrase: string = "";
  nrOfAddresses: number = 5;
  derivationPath: string = "m/44'/60'/0'/0/0";
  genAddresses: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  getAddresses() {
    try {
      var keys = Web3Service.getPrivateKeys(this.seedPhrase, this.nrOfAddresses, this.derivationPath);
      this.genAddresses = "Public Address                             - Private key\n";
      keys.forEach(key => {
        var address = Web3Service.getAddressFromPrivateKey(key);
        this.genAddresses += address + " - " + key + "\n";
      });
    } catch (error) {
      this.genAddresses = String(error);
    }
  }

}



