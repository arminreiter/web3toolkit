import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { Web3Service } from 'src/app/shared/services/web3.service';

@Component({
  selector: 'w3tk-drainfunds',
  templateUrl: './drainfunds.component.html',
  styleUrls: ['./drainfunds.component.scss']
})
export class DrainfundsComponent implements OnInit {
  seedPhrases: string = "";
  nrOfAddresses: number = 5;
  derivationPath: string = "m/44'/60'/0'/0/0";
  targetAddress: string = "";
  gas: number = 21000;
  gasPrice: number = 10;
  output: string = "";

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  async drainFunds() {
    this.output = "";
    try {

      if(!Web3Service.isValidAddress(this.targetAddress)) {
        this.output = "Target address is invalid!";
        return;
      }
      console.log("drain funds started...");

      var phrases = this.seedPhrases.split("\n");

      phrases.forEach(phrase => {
        phrase = phrase.trim();
        if(phrase.length < 2) { // can also be lower than 10, 2 is just what I chose
          return;
        }

        var keys = Web3Service.getPrivateKeys(phrase, this.nrOfAddresses, this.derivationPath);
        keys.forEach(async key => {
          var address = Web3Service.getAddressFromPrivateKey(key);
          var tmpResult = await Web3Service.drainFunds(key, this.targetAddress, 
            this.dataService.network, this.gas, this.gasPrice);
          if(tmpResult.length > 0) {
            this.output += tmpResult.join("\n") + "\n";
          }
        });

      });

    } catch (error) {
      this.output = String(error);
    }
    console.log("drain funds finished!");
  }

}
