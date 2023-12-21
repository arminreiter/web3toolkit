import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Web3Service } from 'src/app/shared/services/web3.service';

@Component({
  selector: 'w3tk-get-address-from-seed',
  templateUrl: './get-address-from-seed.component.html',
  styleUrls: ['./get-address-from-seed.component.scss']
})
export class GetAddressFromSeedComponent implements OnInit {
  seedPhrase: string = "";
  nrOfAddresses: number = 5;
  derivationPath: string = "m/44'/60'/0'/0/0";
  genAddresses: string = "";

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  getAddresses() {
    try {
      var addresses = Web3Service.getAddresses(this.seedPhrase, this.nrOfAddresses, this.derivationPath);
      this.genAddresses = addresses; 
    } catch (error) {
      this.genAddresses = String(error);
    }
  }

}
