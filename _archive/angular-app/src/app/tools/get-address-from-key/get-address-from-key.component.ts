import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/shared/services/web3.service';

@Component({
    selector: 'w3tk-get-address-from-key',
    templateUrl: './get-address-from-key.component.html',
    styleUrls: ['./get-address-from-key.component.scss'],
    standalone: false
})
export class GetAddressFromKeyComponent implements OnInit {
  privateKeys: string = "";
  genAddresses: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  getAddresses() {
    try {
      var addresses = Web3Service.getAddressFromPrivateKeys(this.privateKeys.split("\n"));
      this.genAddresses = addresses.join("\n"); 
    } catch (error) {
      this.genAddresses = String(error);
    }
  }
}
