import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'w3tk-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  @Input() title:string = '';
  @Output() public onClick: EventEmitter<any> = new EventEmitter();
  result:string = '';

  faPlay = faPlay;

  constructor() { }

  ngOnInit(): void {
    
  }

  click(): void {
    this.onClick.emit();
  }

}
