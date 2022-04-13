import { Component, OnInit } from '@angular/core';
import { DataService } from './shared/services/data.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'w3tk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'web3toolkit';

  constructor(public dataService: DataService, private route: ActivatedRoute) {
  }

  ngOnInit(): void { 
    this.route.queryParamMap.subscribe(params=>{
      var net = params.get("net");
      if(net != null) {
        this.dataService.trySetNetwork(net);
      }
  });
  }

}
