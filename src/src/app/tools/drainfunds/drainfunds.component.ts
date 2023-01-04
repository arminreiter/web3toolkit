import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { Web3Service } from 'src/app/shared/services/web3.service';

@Component({
  selector: 'w3tk-drainfunds',
  templateUrl: './drainfunds.component.html',
  styleUrls: ['./drainfunds.component.scss']
})
export class DrainfundsComponent implements OnInit {
  input: string = "";
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

      var phrases = this.input.split("\n").map(element => element.trim());

      phrases.forEach(line => {
        
        if(line.length < 2) { // can also be lower than 10, 2 is just what I chose
          return;
        }

        if(line.startsWith("0x")) {
          this.drain(line);
        }
        else {
          var keys = Web3Service.getPrivateKeys(line, this.nrOfAddresses, this.derivationPath);
          keys.forEach(async key => {
            await this.drain(key);
          });
        }

      });

    } catch (error) {
      this.output = String(error);
    }
    console.log("drain funds finished!");
  }

  async drain(key: string) {
    var tmpResult = await Web3Service.drainFunds(key, this.targetAddress, 
      this.dataService.network, this.gas, this.gasPrice);
    if(tmpResult.length > 0) {
      this.output += tmpResult + "\n";
    }
  }

}
