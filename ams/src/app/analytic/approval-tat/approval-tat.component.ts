import { Component, OnInit, Input, Output, EventEmitter, trigger, style, transition, animate } from '@angular/core';
import { ApprovalDetailComponent } from '../approval-detail/approval-detail.component';
import { MatDialog } from '@angular/material';
import { AnalyticService } from '../analytic.service';
@Component({
	selector: 'app-approval-tat',
	templateUrl: './approval-tat.component.html',
	styleUrls: ['./approval-tat.component.scss'],
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
export class ApprovalTatComponent implements OnInit {

	countryId = localStorage.getItem('countryId')
	approvalCalRes: any;
	onLoadRequestObj = {
		"action":"AMS",
		"countryId":localStorage.getItem("countryId"),
		"currOrderState": "Repair in Progress",
		"brandIds": [],
		"modelIds": [],
		"stateIds": [],
		"fromDate": null,
		"toDate": null,
		
	}

	@Input() public set approvalFilter(val: any) {
		if (typeof val != "undefined") {
			this.onLoadRequestObj = val;
			this.onLoadRequestObj.currOrderState = "Repair in Progress",
				this.getApprovalTATCalculation();
		}
	}

	noData: boolean = true;
	hideWidgetLoader: boolean = false;
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
		this.getApprovalTATCalculation();
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

	getApprovalTATCalculation() {
		this.noData = true;
		this.pieChartData = [];
		this.pieChartLabels = [];console.log("object",this.onLoadRequestObj)
		this.analyticService.getApprovalTATCalculation(this.onLoadRequestObj).subscribe(
			(res) => {
				
				if (res.responseCode == 200) {
					this.noData = false;
					this.hideWidgetLoader = true;
					this.approvalCalRes = res.responseObj;
					
					if(this.countryId == "1"){
						for (let key in this.approvalCalRes.detailsListMap) {
							if((key == "Repair Severity %") || (key == "Cost Per Repair") || (key == "Beyond Economical Repair")){

							}else{
								this.pieChartData.push(parseInt(this.approvalCalRes.detailsListMap[key]));
								
								this.pieChartLabels.push(key);
							}
						}
					}
					else{
						for (let key in this.approvalCalRes.detailsListMap) {
							this.pieChartData.push(parseInt(this.approvalCalRes.detailsListMap[key]));
							this.pieChartLabels.push(key);
						}
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

	approvalDetail(): void {
		this.onLoadRequestObj.currOrderState = "Repair in Progress"
		let dialogRef = this.dialog.open(ApprovalDetailComponent, {
			width: '1100px',
			disableClose: false,
			data: { obj: this.onLoadRequestObj }
		});
	}
}