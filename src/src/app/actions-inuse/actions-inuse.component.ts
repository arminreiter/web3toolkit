import { Component, OnInit } from '@angular/core';
import { faPlay, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Action } from '../shared/actions/action';
import { DataService } from '../shared/services/data.service';

@Component({
    selector: 'w3tk-actions-inuse',
    templateUrl: './actions-inuse.component.html',
    styleUrls: ['./actions-inuse.component.scss'],
    standalone: false
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
      await this.executeAction(action);
    }
  }

  private executeAction(action: Action): Promise<void> {
    return new Promise(async (resolve) => {
      setTimeout(async () => {
        try {
          let result = await action.run(this.dataService.getInput());
          this.dataService.addResult(action.title, result);
        } catch (error) {
          this.dataService.addResult(action.title, String(error));
        }
        resolve();
      });
    });
  }

  clear() {
    this.dataService.actions = [];
  }

}
