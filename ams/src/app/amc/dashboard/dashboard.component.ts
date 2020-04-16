import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Subscription } from 'rxjs/Subscription';

declare var Packery: any;
declare var Draggabilly: any;

@Component({
  selector: 'app-amc-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  dashboardItems: object = {
    deviceInTransit: true,
    recievedDevice: true,
    pendingForApproval: true,
    repairInProgress: true,
    pendingForDispatch: true,
    deviceDispatched: true
  }
  subscription: Subscription;
  message: any;
  reloadEstimationApproval: any = { "value": false };
  //reloadPendingForApproval: any = { "value": false };

  constructor( private messageService : MessageService) {
    this.subscription =  this.messageService.getMessage().subscribe(
      message =>{
        this.message = message
        
        if(this.message.text == "reloadAfterReestimation"){
          console.log("message",this.message);
          this.reloadEstimationApproval.value = true;
          this.reloadEstimationApproval = JSON.parse(JSON.stringify(this.reloadEstimationApproval));
        }
      }
    )
  }

  draggableElems: any;
  elem: any;
  pckry: any;
  draggies: Array<any> = [];

  ngOnInit() {}

  ngAfterViewInit() {
    this.draggableElems = document.querySelectorAll('.grid-item');
    this.elem = document.querySelector('.grid');
    this.pckry = [];
    this.draggable();

  }

  draggable() {
    for (let i = 0, len = this.draggableElems.length; i < len; i++) {
      let draggableElem = this.draggableElems[i];
      let draggie = new Draggabilly(draggableElem, {
        containment: '.grid',
        handle: '.handle'
      });
      let pckry = new Packery(this.elem, {
        itemSelector: '.grid-item',
        gutter: 0
      });
      pckry.bindDraggabillyEvents(draggie);
      this.pckry.push(pckry);
      this.draggies.push(draggie);
    }
  }

  changeExp(event,pckry){
    setTimeout(function(){
      pckry[0].shiftLayout();
    },250) 
  }

  getDashboardItems(data,pckry): void {
    this.dashboardItems = data;
    setTimeout(function(){
      pckry[0].layout();
    },200);
  }

  deviceReceived() {
    this.reloadEstimationApproval.value = true;
    this.reloadEstimationApproval = JSON.parse(JSON.stringify(this.reloadEstimationApproval));
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
