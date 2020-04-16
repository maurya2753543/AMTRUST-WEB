import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { ReportsRoutingModule } from "./report.routing.module";
import { SharedModule } from "../shared/shared.module";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatProgressSpinnerModule, MatCheckboxModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDialogModule, MatMenuModule, MatTabsModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule } from '@angular/material';
import { NgUploaderModule } from 'ngx-uploader';
import { FormsModule } from '@angular/forms';
import { SortService } from '../dashboard/service/table-sort.service';
import { DeviceInTransitService } from '../dashboard/service/device-in-transit.service';
import {PendingEstimationService} from '../dashboard/service/pending-estimation.service';
import {RepairInProgressService } from '../dashboard/service/repair-in-progress.service';
import {PendingForAMSService} from '../dashboard/service/pending-for-AMS.service';
import {PendingForDispatchService} from '../dashboard/service/pending-for-dispatch.service';
import {DeviceDispatchedService} from '../dashboard/service/device-dispatched.service';
import { DataTablesModule } from 'angular-datatables';
import {MessageService} from '../dashboard/service/message.service';
import {DashboardModule} from '../dashboard/dashboard.module';
import {DeviceInTransitReportComponent} from './device-in-transit-report/device-in-transit-report.component';
import { RepairOrderDetailsComponent } from '../dashboard/repair-order-details/repair-order-details.component';
import { PendingEstimationReportComponent } from './pending-estimation-report/pending-estimation-report.component';
import { PendingForAmsReportComponent } from './pending-for-ams-report/pending-for-ams-report.component';
import { RepairInProgressReportComponent } from './repair-in-progress-report/repair-in-progress-report.component';
import { PendingForDispatchReportComponent } from './pending-for-dispatch-report/pending-for-dispatch-report.component';
import { DeviceDispatchedReportComponent } from './device-dispatched-report/device-dispatched-report.component';
import { DeviceDeliveredReportComponent } from './device-delivered-report/device-delivered-report.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DashboardModule,
    ReportsRoutingModule,
    SharedModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatSortModule,
    MatDialogModule,
    MatMenuModule,
    MatTabsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FlexLayoutModule,
    NgUploaderModule,
    FormsModule,
    DataTablesModule
  ],
  entryComponents: [RepairOrderDetailsComponent],
  declarations: [
    DeviceInTransitReportComponent,
    PendingEstimationReportComponent,
    PendingForAmsReportComponent,
    RepairInProgressReportComponent,
    PendingForDispatchReportComponent,
    DeviceDispatchedReportComponent,
    DeviceDeliveredReportComponent
  ],
  exports:[DeviceInTransitReportComponent],
  providers: [
    MessageService,
    SortService,
    DeviceInTransitService,
    PendingEstimationService,
    RepairInProgressService,
    PendingForAMSService,
    PendingForDispatchService,
    DeviceDispatchedService
  ]
})
export class ReportsModule { }
