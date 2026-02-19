import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/shared/services/web3.service';

@Component({
    selector: 'w3tk-is-valid-address',
    templateUrl: './is-valid-address.component.html',
    styleUrls: ['./is-valid-address.component.scss'],
    standalone: false
})
export class IsValidAddressComponent implements OnInit {
  address: string = "";
  result: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  isValidAddress() {
    this.result = "";
    var addresses = this.address.split("\n");
    addresses.forEach(add => {
      if(add.length > 0) {
        var valid = Web3Service.isValidAddress(add);
        this.result += add + ": " + valid + "\n";
      }
    });
    
  }

}
