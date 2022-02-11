import { Component } from '@angular/core';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import Web3 from 'web3';
import { DataService } from './shared/services/data.service';

@Component({
  selector: 'w3tk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web3toolkit';
  output = DataService.output;
}
