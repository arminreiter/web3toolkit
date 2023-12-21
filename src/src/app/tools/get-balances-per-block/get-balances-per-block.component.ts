import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { Web3Service } from 'src/app/shared/services/web3.service';

@Component({
  selector: 'w3tk-get-balances-per-block',
  templateUrl: './get-balances-per-block.component.html',
  styleUrls: ['./get-balances-per-block.component.scss']
})
export class GetBalancesPerBlockComponent implements OnInit {
  address: string = "";
  delimiter: string = ", ";
  startBlock: number = 0;
  endBlock: number = 0;
  iteration: number = 17280;
  balances: string = "";

  constructor(public dataService: DataService, private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  async getBalances() {

    if(this.endBlock == 0) {
      Web3Service.getLastBlockNumber(this.dataService.network).then((result) => {
        this.endBlock = result; 
      });
    }

    this.balances = "";
    for await(const balance of Web3Service.getBalancesPerBlockAsync(
      this.address, this.dataService.network.rpcUrl, this.delimiter, 
      this.startBlock, this.endBlock, this.iteration)) {
      this.balances += balance;
      this.changeDetector.detectChanges();
    }
  }

}
