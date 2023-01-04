import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Network } from '../../model/network';
import { DataService } from '../../services/data.service';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'w3tk-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  faPlus = faPlus;
  faTrash = faTrash;
  selectedValue: string;

  mainnets: Network[] = Network.getNetworks("main");
  testnets: Network[] = Network.getNetworks("test");
  custom: Network[] = Network.getNetworks("custom");

  cstName: string = "localhost";
  cstRpc: string  = "http://localhost:8454";
  cstChainId: number = 1337;

  closeResult: string = '';

  constructor(public dataService: DataService, private modalService: NgbModal) { 
    this.selectedValue = dataService.network.name;
  }

  ngOnInit(): void {
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  } 

  selectValue(network: Network) {
    this.selectedValue = network.name;
    this.dataService.network = network;
  }

  addNetwork() {
    var result = Network.addCustomNetwork(this.cstName, this.cstRpc, this.cstChainId);
    if(!result) {
      alert("Network already exists!");
    }
    this.custom = Network.getNetworks("custom");
  }

  deleteNetwork(net: Network) {
    Network.removeCustomNetwork(net);
    this.custom = Network.getNetworks("custom");
  }

}
