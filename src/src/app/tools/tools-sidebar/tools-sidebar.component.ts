import { Component, OnInit } from '@angular/core';
import { faCode, faHammer, faKey, faLink, faWallet } from '@fortawesome/free-solid-svg-icons';
import { Action } from 'src/app/shared/actions/action';
import { Module } from 'src/app/shared/model/module';
import { DataService } from 'src/app/shared/services/data.service';
import { ToolsData } from '../tools.data';

@Component({
  selector: 'w3tk-tools-sidebar',
  templateUrl: './tools-sidebar.component.html',
  styleUrls: ['./tools-sidebar.component.scss']
})
export class ToolsSidebarComponent implements OnInit {

  faWallet = faWallet;
  faHammer = faHammer;
  faCode = faCode;
  faKey = faKey;
  faLink = faLink;

  tools = ToolsData.tools;
  
  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  addAction(action: Action) {
    this.dataService.addAction(action);
  }

}
