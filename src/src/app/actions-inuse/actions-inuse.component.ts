import { Component, OnInit } from '@angular/core';
import { faPlay, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'w3tk-actions-inuse',
  templateUrl: './actions-inuse.component.html',
  styleUrls: ['./actions-inuse.component.scss']
})
export class ActionsInuseComponent implements OnInit {
  faPlay = faPlay;
  faTrash = faTrash;

  constructor(public dataService: DataService) { 
  }

  ngOnInit(): void {
  }

  async play() {
    for (var action of this.dataService.actions) {
      let result = await action.run(this.dataService.getInput());
      this.dataService.addResult(action.title, result);
    }
  }

  clear() {
    this.dataService.actions = [];
  }

}
