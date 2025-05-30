import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { Web3Service } from 'src/app/shared/services/web3.service';

@Component({
    selector: 'w3tk-get-balances-per-block',
    templateUrl: './get-balances-per-block.component.html',
    styleUrls: ['./get-balances-per-block.component.scss'],
    standalone: false
})
export class GetBalancesPerBlockComponent implements OnInit {
  address: string = "";
  tokenAddress: string = "";
  delimiter: string = ", ";
  startBlock: BigInt = BigInt(0);
  endBlock: BigInt = BigInt(0);
  iteration: number = 17280;
  balances: string = "";

  constructor(public dataService: DataService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  async getBalances() {
    if(this.endBlock == BigInt(0)) {
      Web3Service.getLastBlockNumber(this.dataService.network).then((result) => {
        this.endBlock = result; 
      });
    }

    this.balances = "";
    for await(const balance of Web3Service.getBalancesPerBlockAsync(
      this.address, this.dataService.network.rpcUrl, this.delimiter, 
      this.startBlock, this.endBlock, this.iteration, 
      this.tokenAddress || undefined)) {  // Pass undefined if tokenAddress is empty
      this.balances += balance;
      this.changeDetector.detectChanges();
    }
  }

}
