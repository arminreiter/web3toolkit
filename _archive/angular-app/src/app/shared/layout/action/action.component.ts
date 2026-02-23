import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPlay, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Action } from '../../actions/action';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'w3tk-action',
    templateUrl: './action.component.html',
    styleUrls: ['./action.component.scss'],
    standalone: false
})
export class ActionComponent implements OnInit {
  @Input() action!:Action;
  @Output() public onClick: EventEmitter<any> = new EventEmitter();

  faPlay = faPlay;
  faTrash = faTrash;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  click(): void {
    this.action.run(this.dataService.getInput()).then(
      (result) => this.dataService.addResult(this.action.title, result)
    ).catch((err) => { this.dataService.addResult(this.action.title, String(err)); });
    
  }

  clear(): void {
    this.dataService.removeAction(this.action.id);
  }

}
