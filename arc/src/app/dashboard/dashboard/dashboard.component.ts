import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../service/message.service';
declare var Packery: any;
declare var Draggabilly: any;

@Component({
  selector: 'app-dashboard',
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
  public dashboardComponent: DashboardComponent;
  draggableElems: any;
  elem: any;
  pckry: any;
  draggies: Array<any> = [];
  reloadPendingEstimation: any = { "value": false };
  reloadDeviceTransit: any = { "value": false };
  reloadPendingForApproval: any = { "value": false };
  reloadRepairInProgress:any = { "value": false };
  reloadPendingForDispatch:any = { "value": false };
  reloadDeviceDispatch:any={ "value": false };
  reloadPendingForDispatchReport: any = {"value":false};

  constructor(cd: ChangeDetectorRef, private messageService: MessageService) {
    this.subscription = this.messageService.getMessage().subscribe(message => {
    this.message = message;
     
      if (this.message.text == "reloadFromPE") {
        this.reloadPendingEstimation.value = true;
        this.reloadPendingForApproval.value = true;
        this.reloadRepairInProgress.value=true;
        this.reloadPendingEstimation = JSON.parse(JSON.stringify(this.reloadPendingEstimation));
        this.reloadPendingForApproval = JSON.parse(JSON.stringify(this.reloadPendingForApproval));
        this.reloadRepairInProgress=JSON.parse(JSON.stringify(this.reloadRepairInProgress));
      }
      if(this.message.text=="changeinPlanDate"){
        this.reloadRepairInProgress.value=true;
        this.reloadRepairInProgress=JSON.parse(JSON.stringify(this.reloadRepairInProgress));
      }
      if(this.message.text=="repairComplete"){
        this.reloadRepairInProgress.value=true;
        this.reloadPendingForDispatch.value=true;
        this.reloadRepairInProgress=JSON.parse(JSON.stringify(this.reloadRepairInProgress));
        this.reloadPendingForDispatch=JSON.parse(JSON.stringify(this.reloadPendingForDispatch));
      }
      if (this.message.text == "reEstimation") {
        this.reloadPendingEstimation.value = true;
        this.reloadRepairInProgress.value=true;
        this.reloadRepairInProgress=JSON.parse(JSON.stringify(this.reloadRepairInProgress));
        this.reloadPendingForApproval = JSON.parse(JSON.stringify(this.reloadPendingForApproval));
      }
      if (this.message.text == "dispatchDone") {
        this.reloadPendingForDispatch.value = true;
        this.reloadDeviceDispatch.value=true;
        this.reloadPendingForDispatch=JSON.parse(JSON.stringify(this.reloadPendingForDispatch));
        this.reloadDeviceDispatch = JSON.parse(JSON.stringify(this.reloadDeviceDispatch));
      }
    });
  }

  ngOnInit() { }

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

  changeExp(event, pckry) {
    setTimeout(function () {
      pckry[0].shiftLayout();
    }, 250)
  }

  getDashboardItems(data, pckry): void {
    this.dashboardItems = data;
    setTimeout(function () {
      pckry[0].layout();
    }, 200);
  }

  deviceReceived() {
    this.reloadPendingEstimation.value = true;
    this.reloadDeviceTransit.value = true;
    this.reloadPendingEstimation = JSON.parse(JSON.stringify(this.reloadPendingEstimation));
    this.reloadDeviceTransit = JSON.parse(JSON.stringify(this.reloadDeviceTransit));

  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
