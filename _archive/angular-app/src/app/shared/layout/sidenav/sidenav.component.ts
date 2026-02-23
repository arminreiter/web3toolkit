import { Component, OnInit } from '@angular/core';
import { faHome, faToolbox, faRobot, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'w3tk-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
    standalone: false
})
export class SidenavComponent implements OnInit {

  faHome = faHome;
  faToolbox = faToolbox;
  faRobot = faRobot;
  faQuestionCircle=faQuestionCircle;

  constructor() { }

  ngOnInit(): void {
  }

}
