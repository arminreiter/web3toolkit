import { Component, OnInit } from '@angular/core';
import { faHome, faToolbox, faRobot, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'w3tk-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    standalone: false
})
export class MainComponent implements OnInit {

  faHome = faHome;
  faToolbox = faToolbox;
  faRobot = faRobot;
  faQuestionCircle=faQuestionCircle;
  
  constructor() { }

  ngOnInit(): void {
  }

}
