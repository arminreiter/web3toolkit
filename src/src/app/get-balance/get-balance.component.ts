import { Component, OnInit } from '@angular/core';
import Web3 from 'web3';
import { ethers } from 'ethers';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'w3tk-get-balance',
  templateUrl: './get-balance.component.html',
  styleUrls: ['./get-balance.component.scss']
})
export class GetBalanceComponent implements OnInit {
  faPlay = faPlay;
  addresses: string = "";
  result: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  getBalances() {
    this.result = "";
    var web3js = new Web3(new Web3.providers.HttpProvider("https://rpc.ecredits.com/"));

    var spadd = this.addresses.split("\n");
    console.log(this.addresses);

    spadd.forEach(address => {
      console.log(address);
      var balance = web3js.eth.getBalance(address).then((bal) => {
        this.result += address + ": " + Web3.utils.fromWei(bal) + "\n";
        
      });      
    });

    return this.result;
  }

}
