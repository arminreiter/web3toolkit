import { Component, OnInit } from '@angular/core';
import Web3 from 'web3';
import { ethers } from 'ethers';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'w3tk-get-balance',
  templateUrl: './get-balance.component.html',
  styleUrls: ['./get-balance.component.scss']
})
export class GetBalanceComponent implements OnInit {
  faPlay = faPlay;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  getBalances() {
    var result = "";
    var web3js = new Web3(new Web3.providers.HttpProvider(this.dataService.network.rpcUrl));

    var spadd = this.dataService.getInput().split("\n");

    var promises: Promise<string | void>[] = [];

    spadd.forEach(address => {
      promises.push(
        web3js.eth.getBalance(address).then((bal) => {
          result += address + ": " + Web3.utils.fromWei(bal) + "\n";
        })
      );
    });

    Promise.all(promises).then(() => {
      this.dataService.addResult("Get Balance", result.slice(0,-1));
    });

    // var counter = 0;
    // spadd.forEach(address => {
    //   var balance = web3js.eth.getBalance(address).then((bal) => {
    //     counter++;
    //     result += address + ": " + Web3.utils.fromWei(bal) + "\n";
    //     if(counter >= spadd.length-1) {
    //       this.dataService.addResult("Get Balance", result.slice(0, -1));
    //     }
    //   });      
    // });
    
    return result;
  }

}
