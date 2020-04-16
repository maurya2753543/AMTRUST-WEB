import { Component, OnInit, Input, Output, EventEmitter, trigger, style, transition, animate } from '@angular/core';
import { RepairDetailComponent } from '../repair-detail/repair-detail.component';
import { MatDialog } from '@angular/material';
import { AnalyticService } from '../analytic.service';

@Component({
	selector: 'app-repair-tat',
	templateUrl: './repair-tat.component.html',
	styleUrls: ['./repair-tat.component.scss'],
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

export class RepairTatComponent implements OnInit {

	repairCalRes: any;
	onLoadRequestObj = {
		"countryId":localStorage.getItem("countryId"),
		"currOrderState": "Pending for Dispatch",
		"brandIds": [],
		"modelIds": [],
		"stateIds": [],
		"fromDate": null,
		"toDate": null,
		"action":"AMS"
	}
	noData: boolean = true;
	hideWidgetLoader:boolean=false;
	@Input() public set repairFilter(val: any) {
		if (typeof val != "undefined") {
		  this.onLoadRequestObj = val;
		  this.onLoadRequestObj.currOrderState = "Pending for Dispatch",
			this.getRepairTATCalculation();
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
		this.getRepairTATCalculation();
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

	getRepairTATCalculation() {
		this.noData = true;
		this.pieChartData=[];
		this.pieChartLabels=[];
		this.analyticService.getRepairTATCalculation(this.onLoadRequestObj).subscribe(
			(res) => {
			
				if (res.responseCode == 200) {
					this.hideWidgetLoader=true;
					this.noData = false;
					this.repairCalRes = res.responseObj;
					let count=0;
					for (let key in this.repairCalRes.detailsListMap) {
						this.pieChartData.push(parseInt(this.repairCalRes.detailsListMap[key]));
						count = count+parseInt(this.repairCalRes.detailsListMap[key]);
						this.pieChartLabels.push(key);
					  }
					  if(count == 0){
						this.pieChartData.push(1);
						this.pieChartLabels.push('No Data');
					}
				}
				else {
					this.noData = true;
					this.hideWidgetLoader=true;
				}
			},
			(err) => {
				this.noData = true;
			}
		)
	}


	repairDetail(): void {
		this.onLoadRequestObj.currOrderState = "Pending for Dispatch"
		let dialogRef = this.dialog.open(RepairDetailComponent, {
			width: '1100px',
			disableClose: false,
			data: { obj: this.onLoadRequestObj }
		});
	}
}
