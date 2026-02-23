import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { Web3Service } from 'src/app/shared/services/web3.service';

@Component({
    selector: 'w3tk-get-balance',
    templateUrl: './get-balance.component.html',
    styleUrls: ['./get-balance.component.scss'],
    standalone: false
})
export class GetBalanceComponent implements OnInit {
  addresses: string = "";
  tokenAddress: string = "";
  delimiter: string = ", ";
  balances: string = "";

  constructor(public dataService: DataService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  async getBalances() {
    this.balances = "";
    for await(const balance of Web3Service.getBalancesAsync(
      this.addresses, 
      this.dataService.network.rpcUrl, 
      this.delimiter,
      this.tokenAddress || undefined)) {
      this.balances += balance;
      this.changeDetector.detectChanges();
    }
  }

}
