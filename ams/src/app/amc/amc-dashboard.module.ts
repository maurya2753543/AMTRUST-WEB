import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AMCDashboardRoutingModule } from "./amc-dashboard.routing.module";
import { SharedModule } from "../shared/shared.module";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCheckboxModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule,MatProgressSpinnerModule, MatDialogModule, MatMenuModule, MatTabsModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import { NgUploaderModule } from 'ngx-uploader';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EstimationApprovalComponent } from './estimation-approval/estimation-approval.component'
import { RepairOrderDetailsComponent } from './repair-order-details/repair-order-details.component';
import { EstimationAmountComponent } from './estimation-amount/estimation-amount.component';
import { AMSFilterComponent } from './ams-filter/ams-filter.component'
import { EstimationApprovalServiceService } from '../services/estimation-approval-service.service';
import { DataTablesModule } from 'angular-datatables';
import { ZoomEstimateApprovalComponent} from './zoom-estimate-approval/zoom-estimate-approval.component';
import { AuthGuard } from '../guard/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../services/token.interceptor';
import { AuthService } from '@app/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { RepairOrderDetailsServiceService } from '../services/repair-order-details-service.service';
import { DeviceTrackingComponent } from './device-tracking/device-tracking.component'
import {DispatchDeviceServiceService} from '../services/dispatch-device-service.service';
import { PlannedDateHistoryComponent } from '../amc/planned-date-history/planned-date-history.component';
import { RepairProgressServiceService } from '../services/repair-progress-service.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AMCDashboardRoutingModule,
    SharedModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
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
    DataTablesModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [
    DashboardComponent,
    EstimationApprovalComponent,
    RepairOrderDetailsComponent,
    EstimationAmountComponent,
    AMSFilterComponent,
    ZoomEstimateApprovalComponent,
    DeviceTrackingComponent,
    PlannedDateHistoryComponent
  ],
  declarations: [
    DashboardComponent,
    EstimationApprovalComponent,
    RepairOrderDetailsComponent,
    EstimationAmountComponent,
    AMSFilterComponent,
    ZoomEstimateApprovalComponent,
    DeviceTrackingComponent,
    PlannedDateHistoryComponent
  ],
  providers: [ 
    AuthGuard,
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    EstimationApprovalServiceService,
    RepairOrderDetailsServiceService,
    DispatchDeviceServiceService,
    RepairProgressServiceService
  ]
})
export class AMCDashboardModule { }