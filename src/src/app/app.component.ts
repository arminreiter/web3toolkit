import { Component } from '@angular/core';
import { DataService } from './shared/services/data.service';

@Component({
  selector: 'w3tk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web3toolkit';


  constructor(public dataService: DataService) {

  }

}
