import { Component, OnInit } from '@angular/core';
import Web3 from 'web3';

@Component({
  selector: 'w3tk-wei-converter',
  templateUrl: './wei-converter.component.html',
  styleUrls: ['./wei-converter.component.scss']
})
export class WeiConverterComponent implements OnInit {
  wei: string = "1";
  gwei: string;
  ether: string;

  constructor() {

    this.ether = Web3.utils.fromWei(String(this.wei), 'ether');
    this.gwei = Web3.utils.fromWei(String(this.wei), 'gwei');
   }

   fwei()
   {
    this.ether = Web3.utils.fromWei(String(this.wei), 'ether');
    this.gwei = Web3.utils.fromWei(String(this.wei), 'gwei');
   }
   
   fgwei()
   {
    this.wei = Web3.utils.toWei(String(this.gwei), 'gwei');
    this.ether = Web3.utils.fromWei(String(this.wei), 'ether');
   }
   
   fether()
   {
    this.wei = Web3.utils.toWei(String(this.ether), 'ether');
    this.gwei = Web3.utils.fromWei(String(this.wei), 'gwei');
   }

  ngOnInit(): void {
  }

}
