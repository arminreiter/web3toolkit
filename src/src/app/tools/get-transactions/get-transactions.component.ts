import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { Web3Service } from 'src/app/shared/services/web3.service';

@Component({
  selector: 'w3tk-get-transactions',
  templateUrl: './get-transactions.component.html',
  styleUrls: ['./get-transactions.component.scss']
})
export class GetTransactionsComponent implements OnInit {
  addresses: string = "";
  transactions: string = "";

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  getTransactions() {
    Web3Service.getTransactions(this.addresses, this.dataService.network.rpcUrl).then( (result) => {
      this.transactions = result; 
    }).catch(error => {
      this.transactions = String(error);
    });
  }


}
