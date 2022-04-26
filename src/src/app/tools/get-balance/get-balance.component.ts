import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { Web3Service } from 'src/app/shared/services/web3.service';

@Component({
  selector: 'w3tk-get-balance',
  templateUrl: './get-balance.component.html',
  styleUrls: ['./get-balance.component.scss']
})
export class GetBalanceComponent implements OnInit {
  addresses: string = "";
  delimiter: string = ", ";
  balances: string = "";

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  getBalances() {
    Web3Service.getBalances(this.addresses, this.dataService.network.rpcUrl, this.delimiter).then( (result) => {
      this.balances = result; 
    }).catch(error => {
      this.balances = String(error);
    });
  }

}
