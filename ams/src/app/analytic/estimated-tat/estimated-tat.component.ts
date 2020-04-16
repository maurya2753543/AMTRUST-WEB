import { Component, OnInit, Input, Output, EventEmitter, trigger, ChangeDetectorRef, style, transition, animate } from '@angular/core';
import { EstimatedDetailComponent } from '../estimated-detail/estimated-detail.component';
import { MatDialog } from '@angular/material';
declare var Chart: any;
import { AnalyticService } from '../analytic.service';
@Component({
  selector: 'app-estimated-tat',
  templateUrl: './estimated-tat.component.html',
  styleUrls: ['./estimated-tat.component.scss'],
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
export class EstimatedTatComponent implements OnInit {
  currentUser = localStorage.getItem('currentUser');
  estimatedCalRes: any;
  estimatedDetRes:any;
  onLoadRequestObj = {
    "countryId":localStorage.getItem("countryId"),
    "currOrderState": "Pending for Approval",
    "brandIds": [],
    "modelIds": [],
    "stateIds": [],
    "fromDate": null,
    "toDate": null,
    "action":"AMS"
  }
  noData: boolean = false;
  hideWidgetLoader: boolean = false;

  @Input() public set estFilter(val: any) {
    if (typeof val != "undefined") {
      this.onLoadRequestObj = val;
      this.onLoadRequestObj.currOrderState = "Pending for Approval",
        this.getEstimatedTATCalculation();
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
    Chart.defaults.global.legend.position = 'right';
    this.getEstimatedTATCalculation();
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


  getEstimatedTATCalculation() {
    this.noData = true;
    let reEstimationCount=0;
    this.pieChartData=[];
    this.pieChartLabels=[];
    this.analyticService.getEstimateDetail(this.onLoadRequestObj).subscribe(
      (res) => {   
        if (res.responseCode == 200) {
          this.noData = false;
          let countlessthan24=0;
          let countlessthan48=0;
          let countmorethan48=0;
          
          this.hideWidgetLoader = true;
          this.estimatedDetRes = res.responseObj;
          this.estimatedDetRes.forEach(function(element) { 
            if(element.timeTaken<24){
              countlessthan24++;
            }else if(element.timeTaken >=24 && element.timeTaken <48){
              countlessthan48++;
            }else{
              countmorethan48++;
            }
            reEstimationCount=reEstimationCount+element.reEstimation;
            
          })
          this.pieChartData.push(countlessthan24);
          this.pieChartLabels.push('0-1');
          this.pieChartData.push(countlessthan48);
          this.pieChartLabels.push('1-2');
          this.pieChartData.push(countmorethan48);
          this.pieChartLabels.push('2+');
          this.onLoadRequestObj.currOrderState = "Pending for Approval";
          this.analyticService.getEstimatedTATCalculation(this.onLoadRequestObj).subscribe(
            (res) => {   
              if (res.responseCode == 200) {
                this.noData = false;
                this.hideWidgetLoader = true;
                this.estimatedCalRes = res.responseObj;
                this.estimatedCalRes.reEstimation = reEstimationCount;
                this.estimatedCalRes.result =(100* reEstimationCount/this.estimatedCalRes.estimation).toFixed(3);
               
      
                // for (let key in this.estimatedCalRes) {
                  
                //   //this.pieChartData.push(parseInt(this.estimatedCalRes.detailsListMap[key]));
                //   console.log(parseInt(this.estimatedCalRes.detailsListMap[key]));
                // //  this.pieChartLabels.push(key);
                // }
              }
              else {
              this.pieChartData.push(0);
              this.pieChartLabels.push('0-1');
              this.pieChartData.push(0);
              this.pieChartLabels.push('1-2');
              this.pieChartData.push(0);
              this.pieChartLabels.push('2+');  
              this.pieChartData.push(1);
              this.pieChartLabels.push('No Data');                  
              this.noData = true;
              this.hideWidgetLoader = true;
              
              }
            },
            (err) => {
              this.noData = true;
            }
          )
          // for (let key in this.estimatedCalRes) {
            
          //   //this.pieChartData.push(parseInt(this.estimatedCalRes.detailsListMap[key]));
          //   console.log(parseInt(this.estimatedCalRes.detailsListMap[key]));
          // //  this.pieChartLabels.push(key);
          // }
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


  estimatedDetail(): void {
    this.onLoadRequestObj.currOrderState = "Pending for Approval";
    let dialogRef = this.dialog.open(EstimatedDetailComponent, {
      width: '1100px',
      disableClose: false,
      data: { obj: this.onLoadRequestObj }
    });
  }
}