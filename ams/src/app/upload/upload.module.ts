import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import {UploadRoutingModule} from './upload.routing.module';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { SharedModule } from "../shared/shared.module";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatProgressSpinnerModule, MatCheckboxModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDialogModule, MatMenuModule, MatTabsModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule } from '@angular/material';
import { NgUploaderModule } from 'ngx-uploader';
import { FormsModule } from '@angular/forms';
import {AMCDashboardModule} from '../amc/amc-dashboard.module';
import { DataTablesModule } from 'angular-datatables';
import { RepairOrderDetailsComponent } from '../amc/repair-order-details/repair-order-details.component';
// import { EstimateApprovalReportComponent } from '../report/estimate-approval-report/estimate-approval-report.component'
import {MessageService} from '../services/message.service';
import { SortService } from '../services/table-sort.service';
import { EstimationApprovalServiceService } from '../services/estimation-approval-service.service';
// import { DeviceDispatchedReportComponent } from './device-dispatched-report/device-dispatched-report.component';
import { DispatchDeviceServiceService } from '../services/dispatch-device-service.service'

@NgModule({
  imports: [
    CommonModule,
    UploadRoutingModule,
    RouterModule,
    AMCDashboardModule,
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
    UploadFilesComponent
  ],
  exports:[],
  providers: [
    MessageService,
    SortService,
    EstimationApprovalServiceService,
    DispatchDeviceServiceService
  ]
})




export class UploadModule { }
