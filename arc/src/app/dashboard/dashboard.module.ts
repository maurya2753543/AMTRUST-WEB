import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { DashboardRoutingModule } from "./dashboard.routing.module";
import { SharedModule } from "../shared/shared.module";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatProgressSpinnerModule, MatCheckboxModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDialogModule, MatMenuModule, MatTabsModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule } from '@angular/material';
import { NgUploaderModule } from 'ngx-uploader';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeviceInTransitComponent } from './device-in-transit/device-in-transit.component';
import { RepairOrderDetailsComponent } from './repair-order-details/repair-order-details.component';
import { RecievedDeviceComponent } from './recieved-device/recieved-device.component';
import { PendingForApprovalComponent } from './pending-for-approval/pending-for-approval.component';
import { RepairInProgressComponent } from './repair-in-progress/repair-in-progress.component';
import { PendingForDispatchComponent } from './pending-for-dispatch/pending-for-dispatch.component';
import { DeviceDispatchedComponent } from './device-dispatched/device-dispatched.component';
import { DeviceInTransitRecievedComponent } from './device-in-transit-recieved/device-in-transit-recieved.component';
import { DeviceInTransitDisputeComponent } from './device-in-transit-dispute/device-in-transit-dispute.component';
import { RecievedDeviceEstimationComponent } from './recieved-device-estimation/recieved-device-estimation.component';
import { RecievedDeviceReEstimationComponent } from './recieved-device-reestimation/recieved-device-reestimation.component';
import { AddSparePartComponent } from './add-spare-part/add-spare-part.component';
import { PendingForApprovalAmountComponent } from './pending-for-approval-amount/pending-for-approval-amount.component';
import { PendingForDispatchDetailComponent } from './pending-for-dispatch-detail/pending-for-dispatch-detail.component';
import { RepairInProgressDoneComponent } from './repair-in-progress-done/repair-in-progress-done.component';
import { FormsModule } from '@angular/forms';
import { SortService } from './service/table-sort.service';
import { SortableTableDirective } from './service/sort-directive';
import { ModifyRepairDateComponent } from './modify-repair-date/modify-repair-date.component';
import { DeviceInTransitService } from './service/device-in-transit.service';
import {PendingEstimationService} from './service/pending-estimation.service';
import {RepairInProgressService } from './service/repair-in-progress.service';
import {PendingForAMSService} from './service/pending-for-AMS.service';
import {PendingForDispatchService} from './service/pending-for-dispatch.service';
import {DeviceDispatchedService} from './service/device-dispatched.service';
import { DataTablesModule } from 'angular-datatables';
import {MessageService} from './service/message.service';
import { PlannedDateHistoryComponent } from './planned-date-history/planned-date-history.component';
import { PendingForDispatchCaptiveComponent } from './pending-for-dispatch-captive/pending-for-dispatch-captive.component';
import { DatePipe } from '@angular/common';
import { DeviceTrackingComponent } from './device-tracking/device-tracking.component';
import { ApprovedSparePartsComponent } from './approved-spare-parts/approved-spare-parts.component';
import {NumberFormatterPipe} from '../shared/pipes/number-formatter.pipe';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { PendingApprovalDisputedComponent } from './pending-approval-disputed/pending-approval-disputed.component';
import { DeviceDelieverdServiceService } from './service/device-delieverd-service.service';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
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
    DataTablesModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  entryComponents: [
    DashboardComponent,
    RepairOrderDetailsComponent,
    DeviceInTransitRecievedComponent,
    DeviceInTransitDisputeComponent,
    RecievedDeviceEstimationComponent,
    RecievedDeviceReEstimationComponent,
    AddSparePartComponent,
    PendingForApprovalAmountComponent,
    PendingForDispatchDetailComponent,
    RepairInProgressDoneComponent,
    ModifyRepairDateComponent,  
    PlannedDateHistoryComponent,
    PendingForDispatchCaptiveComponent,
    DeviceTrackingComponent,
    ApprovedSparePartsComponent,
    PendingApprovalDisputedComponent
  ],
  declarations: [
    DashboardComponent,
    DeviceInTransitComponent,
    RepairOrderDetailsComponent,
    RecievedDeviceComponent,
    PendingForApprovalComponent,
    RepairInProgressComponent,
    PendingForDispatchComponent,
    DeviceDispatchedComponent,
    DeviceInTransitRecievedComponent,
    DeviceInTransitDisputeComponent,
    RecievedDeviceEstimationComponent,
    RecievedDeviceReEstimationComponent,
    AddSparePartComponent,
    PendingForApprovalAmountComponent,
    PendingForDispatchDetailComponent,
    RepairInProgressDoneComponent,
    SortableTableDirective,
    ModifyRepairDateComponent,
    PlannedDateHistoryComponent,
    PendingForDispatchCaptiveComponent,
    DeviceTrackingComponent,
    ApprovedSparePartsComponent,
    NumberFormatterPipe,
    PendingApprovalDisputedComponent
  ],
  providers: [
    MessageService,
    SortService,
    DeviceInTransitService,
    PendingEstimationService,
    RepairInProgressService,
    PendingForAMSService,
    PendingForDispatchService,
    DeviceDispatchedService,
    DatePipe,
    DeviceDelieverdServiceService
  ]
})
export class DashboardModule { }