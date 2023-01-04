import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/shared/services/web3.service';

@Component({
  selector: 'w3tk-generate-keypair',
  templateUrl: './generate-keypair.component.html',
  styleUrls: ['./generate-keypair.component.scss']
})
export class GenerateKeypairComponent implements OnInit {
  genKeyPairs: String = "";
  nrOfKeyPairs: Number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  generateKeyPairs()
  {
    this.genKeyPairs = "Private Key,                                                        Public Address\n";

    for(var i = 0; i < this.nrOfKeyPairs; i++) {
      this.genKeyPairs += Web3Service.genKeyPair() + "\n";
    }
  }

}
