import { Component, OnInit, Input,Output, EventEmitter, trigger, style, transition, animate  } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AnalyticService } from '../analytic.service';

@Component({
  selector: 'app-pending-tat',
  templateUrl: './pending-tat.component.html',
  styleUrls: ['./pending-tat.component.scss'],
  animations: [
    trigger(
      'isToggle', [
        transition(':enter', [
          style({ 'height': '0', 'opacity': '0' }),
          animate('200ms linear', style({ 'height': '*', 'opacity': '1' }))
        ]),
        transition(':leave', [
          style({ 'height': '*', 'opacity': '1' }),
          animate('200ms linear', style({ 'height': '0', 'opacity': '0' })
          )])
      ]
    )]
})
export class PendingTatComponent implements OnInit {
	currentUser = localStorage.getItem('currentUser');
	pendingRes: any;
	onLoadRequestObj = {
		"countryId":localStorage.getItem("countryId"),
		"currOrderState": "Device Dispatched",
		"brandIds": [],
		"modelIds": [],
		"stateIds": [],
		"fromDate": null,
		"toDate": null,
		"arcId":JSON.parse(this.currentUser).arcId
	}
	noData: boolean = true;
	hideWidgetLoader: boolean = false;
	@Input() public set pendingFilter(val: any) {
		if (typeof val != "undefined") {
			this.onLoadRequestObj = val;
			this.onLoadRequestObj.currOrderState = "Device Dispatched",
				this.getDispatchTATCalculation();
		}
	}
	/*declation of input parameter for dashboard items*/
	@Input() public show: boolean;
	
	@Output()
	changeExpansion: EventEmitter<boolean> = new EventEmitter<boolean>();

	/**Declearation for show hide panel content */
	isToggle: boolean = true;
	  
	constructor(public dialog: MatDialog, private analyticService: AnalyticService) { }
	
	ngOnInit() {
		this.getDispatchTATCalculation();
	}

	// events
	public chartClicked(e:any):void {

	}
	 
	public chartHovered(e:any):void {

	}
	
	/**
	 *Method for toggle show hide
	*/
	toggle() {
		this.isToggle = !this.isToggle;
		this.changeExpansion.emit(this.isToggle);
	}

	getDispatchTATCalculation() {
    this.noData = true;
    this.analyticService.getDispatchTATCalculation(this.onLoadRequestObj).subscribe(
      (res) => {

        if (res.responseCode == 200) {
					this.noData = false;
          this.pendingRes = res.responseObj.detailsListMap;
          this.hideWidgetLoader = true;
        }
        else {
					this.noData = true;
					this.hideWidgetLoader = true;
        }
      },
      (err) => {
        this.noData = true;
      }
    )
  }
}
