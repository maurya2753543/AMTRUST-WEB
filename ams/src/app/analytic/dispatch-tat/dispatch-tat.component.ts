import { Component, OnInit, Input, Output, EventEmitter, trigger, style, transition, animate } from '@angular/core';
import { DispatchDetailComponent } from '../dispatch-detail/dispatch-detail.component';
import { MatDialog } from '@angular/material';
import { AnalyticService } from '../analytic.service';

@Component({
	selector: 'app-dispatch-tat',
	templateUrl: './dispatch-tat.component.html',
	styleUrls: ['./dispatch-tat.component.scss'],
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
export class DispatchTatComponent implements OnInit {

	dispatchCalRes: any;
	onLoadRequestObj = {
		"countryId":localStorage.getItem("countryId"),
		"currOrderState": "Device Dispatched",
		"brandIds": [],
		"modelIds": [],
		"stateIds": [],
		"fromDate": null,
		"toDate": null,
		"action":"AMS"
	}
	noData: boolean = true;
	hideWidgetLoader: boolean = false;
	@Input() public set dispatchFilter(val: any) {
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

	// Pie
	public pieChartLabels: string[] = [];
	public pieChartData: number[] = [];
	public pieChartType: string = 'pie';
	public pieChartColors: any[] = [{ backgroundColor: ["#64a70b", "#ff821f", "#002d72", "#888b8d", "#ffe200", "#7c00ff","#f44336","#b4f436","#36f4e2","#e036f4","#212123","#8cb1d8"] }]

	constructor(public dialog: MatDialog, private analyticService: AnalyticService) { }

	ngOnInit() {
		this.getDispatchTATCalculation();
	}

	// events
	public chartClicked(e: any): void {

	}

	public chartHovered(e: any): void {

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
		this.pieChartData = [];
		this.pieChartLabels = [];
		this.analyticService.getDispatchTATCalculation(this.onLoadRequestObj).subscribe(
			(res) => {

				if (res.responseCode == 200) {
					this.noData = false;
					this.dispatchCalRes = res.responseObj;
					this.hideWidgetLoader = true;
					for (let key in this.dispatchCalRes.detailsListMap) {
						this.pieChartData.push(parseInt(this.dispatchCalRes.detailsListMap[key]));
						this.pieChartLabels.push(key);
					}
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

	dispatchDetail(): void {
		this.onLoadRequestObj.currOrderState = "Device Dispatched";
		let dialogRef = this.dialog.open(DispatchDetailComponent, {
			width: '1100px',
			disableClose: false,
			data: { obj: this.onLoadRequestObj }
		});
	}
}