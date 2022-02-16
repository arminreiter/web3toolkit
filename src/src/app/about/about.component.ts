import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFlask } from '@fortawesome/free-solid-svg-icons';
import { Actions } from '../shared/actions/actions';
import { GetBalance } from '../shared/actions/getBalance';
import { Network } from '../shared/model/network';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'w3tk-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  faFlask = faFlask;

  constructor(private router: Router, public dataService: DataService) { }

  ngOnInit(): void {
  }

  addressGeneration() {
    this.dataService.actions = [];

    this.dataService.addAction(Actions.genSeedPhraseAction());
    this.dataService.addAction(Actions.getAddressesFromSeedPhrase());
    this.dataService.addAction(Actions.getAddressesFromPrivateKeys());

    this.router.navigate(['/']);
  }

  balanceReport() {
    this.dataService.actions = [];
    this.dataService.input = "0x0000000000000000000000000000000000000000";
    this.dataService.addAction(new GetBalance());
    this.router.navigate(['/']);
  }

}
