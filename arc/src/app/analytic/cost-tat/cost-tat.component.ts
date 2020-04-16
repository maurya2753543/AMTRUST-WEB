import { Component, OnInit, Input,Output, EventEmitter, trigger, style, transition, animate  } from '@angular/core';
import { AnalyticService } from '../analytic.service';

@Component({
  selector: 'app-cost-tat',
  templateUrl: './cost-tat.component.html',
  styleUrls: ['./cost-tat.component.scss'],
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
    )
  ]
})
export class CostTatComponent implements OnInit {
	currentUser = localStorage.getItem('currentUser');
  onLoadRequestObj = {
		"countryId":localStorage.getItem("countryId"),
		"currOrderState": "Repair in Progress",
		"brandIds": [],
		"modelIds": [],
		"stateIds": [],
		"fromDate": null,
		"toDate": null,
		"arcId":JSON.parse(this.currentUser).arcId
  }
  
  @Input() public set costFilter(val: any) {
		if (typeof val != "undefined") {
			this.onLoadRequestObj = val;
			this.onLoadRequestObj.currOrderState = "Repair in Progress",
				this.getApprovalTATCalculation();
		}
	}
	/*declation of input parameter for dashboard items*/
	@Input() public show: boolean;
	
	@Output()
	changeExpansion: EventEmitter<boolean> = new EventEmitter<boolean>();

	/**Declearation for show hide panel content */
	isToggle: boolean = true;
	noData: boolean = true;
  hideWidgetLoader: boolean = false;
  costCalRes: any;
	constructor(private analyticService: AnalyticService) { }

	ngOnInit() {
    this.getApprovalTATCalculation();
  }

  getApprovalTATCalculation() {
		this.noData = true;
		this.analyticService.getApprovalTATCalculation(this.onLoadRequestObj).subscribe(
			(res) => {
				if (res.responseCode == 200) {			
					this.hideWidgetLoader = true;
          this.costCalRes = res.responseObj.detailsListMap;
          this.noData = false;
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

	/**
	 *Method for toggle show hide
	*/
	toggle() {
		this.isToggle = !this.isToggle;
		this.changeExpansion.emit(this.isToggle);
	}
}