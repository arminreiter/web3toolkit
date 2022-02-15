import { Component, OnInit } from '@angular/core';
import { Network } from '../shared/model/network';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'w3tk-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {
  selectedValue: string = "Ethereum";

  mainnets: Network[] = Network.Networks.filter(net => net.isTestNet == false);
  testnets: Network[] = Network.Networks.filter(net => net.isTestNet == true);

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  selectValue(network: Network) {
    this.selectedValue = network.name;
    this.dataService.network = network;
  }

}
