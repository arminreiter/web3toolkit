import { Component, OnInit } from '@angular/core';
import { ToolsData } from '../tools.data';

@Component({
  selector: 'w3tk-tools-overview',
  templateUrl: './tools-overview.component.html',
  styleUrls: ['./tools-overview.component.scss']
})
export class ToolsOverviewComponent implements OnInit {
  tools =  ToolsData.tools;

  // tmpTools = ToolsData.tools.map(x => x.actions);
  // tools = this.tmpTools.reduce((acc, val) => acc.concat(val), []);

  constructor() { }

  ngOnInit(): void {
  }

}
