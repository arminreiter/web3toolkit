import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';


@Component({
  selector: 'w3tk-input-output',
  templateUrl: './input-output.component.html',
  styleUrls: ['./input-output.component.scss']
})
export class InputOutputComponent implements OnInit {
  
  constructor(public dataService: DataService) {
  }

  ngOnInit(): void { 
  }

}
