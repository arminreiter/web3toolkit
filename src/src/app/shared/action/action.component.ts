import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPlay, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Action, DataService } from '../services/data.service';

@Component({
  selector: 'w3tk-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
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
    this.action.action();
  }

  clear(): void {
    this.dataService.removeAction(this.action.id);
  }

}
