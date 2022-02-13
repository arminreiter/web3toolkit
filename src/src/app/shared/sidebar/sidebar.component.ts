import { Component, OnInit } from '@angular/core';
import { faHammer, faWallet } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'w3tk-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  faWallet = faWallet;
  faHammer = faHammer;

  constructor() { }

  ngOnInit(): void {
  }

  genSeedPhrase() {
    var cur = localStorage.getItem("seedphrase");
    if(cur)
      localStorage.setItem("seedphrase", cur + ",asdf")
    else
      localStorage.setItem("seedphrase", "asdf");
  }

}
