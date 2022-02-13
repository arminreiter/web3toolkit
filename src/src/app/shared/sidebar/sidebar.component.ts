import { Component, OnInit } from '@angular/core';
import { faHammer, faRadiation, faWallet, faCode } from '@fortawesome/free-solid-svg-icons';
import { ethers } from 'ethers';
import { Action, DataService } from '../services/data.service';
import { Web3Service } from '../services/web3.service';

@Component({
  selector: 'w3tk-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  faWallet = faWallet;
  faHammer = faHammer;
  faCode = faCode;
  

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  genSeedPhrase() {
    var cur = localStorage.getItem("seedphrase");
    if(cur)
      localStorage.setItem("seedphrase", cur + ",asdf")
    else
      localStorage.setItem("seedphrase", "asdf");
  }

  addAction() {

  }

  addGenSeedPhrase() {
    this.dataService.addAction(new Action("Generate Seed Phrase", () => 
    {
      var result = Web3Service.genSeedPhrase();
      this.dataService.addResult("Generate Seed Phrase", result);
    }));
  }

  addPrivateKeyAction() {
    this.dataService.addAction(new Action("Get Private Keys", () => 
    {
      var result = Web3Service.getPrivateKeys(this.dataService.getInput(), 20);
      this.dataService.addResult("Get Private Keys", result);
    }));
  }

  addBalanceAction() {
    this.dataService.addAction(new Action("Get Balances", () => 
    {
      Web3Service.getBalances(this.dataService.getInput(), this.dataService.network.rpcUrl).then((result) => {
        this.dataService.addResult("Get Balances", result);
      });
      
    }));
  }

  addAddressesAction() {
    this.dataService.addAction(new Action("Get Addresses from Seed Phrase", () => 
    {
      var result = Web3Service.getAddresses(this.dataService.getInput(), 20);
      this.dataService.addResult("Get Addresses from Seed Phrase", result);
    }));
  }

  addAddressesPKAction() {
    this.dataService.addAction(new Action("Get Addresses from Private Key(s)", () => 
    {
      var result = Web3Service.getAddressFromPrivateKeys(this.dataService.getInput());
      this.dataService.addResult("Get Addresses from Private Key(s)", result);
    }));
  }

}
