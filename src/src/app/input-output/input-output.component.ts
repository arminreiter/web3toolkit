import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: 'w3tk-input-output',
    templateUrl: './input-output.component.html',
    styleUrls: ['./input-output.component.scss'],
    standalone: false
})
export class InputOutputComponent implements OnInit {
  faTrash = faTrash;
  
  constructor(public dataService: DataService) {
  }

  ngOnInit(): void { 
  }

  clear() {
    this.dataService.clear();
  }

}
