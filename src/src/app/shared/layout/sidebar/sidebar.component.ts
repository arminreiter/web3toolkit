import { Component, OnInit } from '@angular/core';
import { faHammer, faWallet, faCode, faKey } from '@fortawesome/free-solid-svg-icons';
import { Action } from '../../actions/action';
import { Actions } from '../../actions/actions';
import { Module } from '../../model/module';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'w3tk-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  faWallet = faWallet;
  faHammer = faHammer;
  faCode = faCode;
  faKey = faKey;

  actions: Action[] = Actions.get();

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
