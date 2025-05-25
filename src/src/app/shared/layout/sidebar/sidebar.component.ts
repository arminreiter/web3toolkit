import { Component, OnInit } from '@angular/core';
import { faHammer, faWallet, faCode, faKey, faLink } from '@fortawesome/free-solid-svg-icons';
import { Action } from '../../actions/action';
import { Actions } from '../../actions/actions';
import { Module } from '../../model/module';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'w3tk-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    standalone: false
})
export class SidebarComponent implements OnInit {

  faWallet = faWallet;
  faHammer = faHammer;
  faCode = faCode;
  faKey = faKey;
  faLink = faLink;

  actions: Action[] = Actions.get();
  modules = [
    { module: Module.KeyManagement, icon: faKey},
    { module: Module.Wallet,        icon: faWallet},
    { module: Module.Blockchain,    icon: faLink},
    { module: Module.Utils,         icon: faCode}
  ]

  getKeyMgmt() { return this.getActions(Module.KeyManagement); }
  getWallet() { return this.getActions(Module.Wallet); }
  getUtils() { return this.getActions(Module.Utils); }

  getActions(mod: Module) {
    return this.actions.filter(x => x.module == mod);
  }
  
  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  addAction(action: Action) {
    this.dataService.addAction(action);
  }

}
